from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import pickle

app = Flask(__name__)
CORS(app)

df = pickle.load(open('df.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))

def recommendation(Position):

    indx = df[df['Position'] == Position].index[0]
    distances = sorted(list(enumerate(similarity[indx])), key=lambda x: x[1], reverse=True)[1:10]
    # Now we have the indexes of common items . So we can decide what we want for Recommendations
    jobs = []
    for i in distances:
        jobs.append(df.iloc[i[0]]['Title'])
    return jobs


@app.route('/recommend', methods=['POST'])  # Change to POST method
def recommend_jobs():
    data = request.get_json()
    Position = data.get('Position', '')
    print(f"Received Position: {Position}") 
    if Position:
        jobs = recommendation(Position)
        return jsonify({'jobs': jobs})
    else:
        return jsonify({'error': 'Position not provided'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
