import serial
from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)
ser = serial.Serial('com4', 115200)

def fetch(output):
    output = output.split("|")
    moisture_percentage = float(output[0].split('= ')[1])
    gas_value = float(output[1].split('= ')[1])
    distance = int(output[2].split('= ')[1])
    data = {
        'moisturePercentage': moisture_percentage,
        'gasValue': gas_value,
        'distance': distance
    }
    return data

@app.route('/get_data', methods=['GET'])
def get_data(): 
    while ser.in_waiting == 0:
        pass
    data = None
    while not data:
        output = ser.readline().decode('utf-8').strip()
        try:
            data = fetch(output)
        except:
            pass
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
