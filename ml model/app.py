from flask import Flask, jsonify, request
import json
from joblib import load
import pandas as pd

app = Flask(__name__)

doc_profile = load('doc_profile.joblib')
signature_matrix = load('signature_matrix.joblib')


def jaccardSimiliarity(doc1, doc2):
    intersection = 0
    union = len(doc1)
    for each in doc2:
        if each in doc1:
            intersection += 1
        else:
            union += 1
    return intersection/union


# find the similar jobs
def find_sim_jobs(target, doc_profile, hashdict):
    if(len(doc_profile[target]) == 0):
        print("No Matching jobs")
        return []
    candidate_pair = []
    result = []

    for document in range(len(doc_profile)):
        if document == target:
            continue
        same_band = 0
        for band in range(0, len(hashdict[0])):
            if(hashdict[target][band] == hashdict[document][band]):
                same_band += 1
        if(same_band > 1):
            candidate_pair.append((target, document))

    for i, j in candidate_pair:
        jaccard_sim = round(jaccardSimiliarity(
            doc_profile[i], doc_profile[j]), 3)
        if(jaccard_sim >= 0.2):
            result.append([i, j+1, jaccard_sim])
    return result


@app.route('/jobrecommendations/<int:id>', methods=['GET'])
def recommendations(id):
    result = find_sim_jobs(id, doc_profile, signature_matrix)
    result.sort(key=lambda x: x[-1], reverse=True)
    similarjobs = []
    i = 0
    for each in result:
        if i == 9:
            break
        similarjobs.append(each[1])
        i += 1
    return jsonify(similarjobs), 200


@app.route('/applicationbased', methods=['POST'])
def applicationbased_recommendations():
    ids = request.json
    ids = set(ids)
    result = []
    for jobid in ids:
        result.extend(find_sim_jobs(jobid, doc_profile, signature_matrix))
    result.sort(key=lambda x: x[-1], reverse=True)
    similarjobs = []
    i = 0
    for each in result:
        if i == 9:
            break
        if each[1] not in ids:
            similarjobs.append(each[1])
            i += 1
    return jsonify(similarjobs), 200


if __name__ == "__main__":
    app.run()
