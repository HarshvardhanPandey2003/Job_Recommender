from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import pickle

app = Flask(__name__)
CORS(app)

df = pickle.load(open('df.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))

def recommendation(Position, State):
    try:
        # Filter indices based on the specified state
        state_indices = df[df['State.NameT'] == State].index
        # Save of the Indexes of States 
        indx = df[df['Position'] == Position].index[0]
        distances = sorted(list(enumerate(similarity[indx])), key=lambda x: x[1], reverse=True)[:10]

        # Get recommendations for the specified state
        state_filtered_recommendations = []
        for i in distances:
            index= i[0]
            if index in state_indices:
                job_title = df.iloc[index]['Title']
                state_filtered_recommendations.append((job_title))
        filtered_recommendations=state_filtered_recommendations[:10]

        return filtered_recommendations
    except IndexError:
        return []

@app.route('/recommend', methods=['POST'])
def recommend_jobs():
    data = request.get_json()
    Position = data.get('Position', '')
    State = data.get('State', '')
    print(f"Received Position: {Position}, State: {State}")
    
    jobs = recommendation(Position, State)
    
    # Sort recommendations by similarity score
    jobs = sorted(jobs, key=lambda x: x[1], reverse=True)
    
    return jsonify({'jobs': jobs})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)