import datetime
import hashlib
import json
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

class Blockchain:
    def __init__(self):
        self.chain = []
        self.pending_transactions = []
        self.create_block(previous_hash='0', proof=100)

    def create_block(self, proof, previous_hash):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': str(datetime.datetime.now()),
            'proof': proof,
            'previous_hash': previous_hash,
            'transactions': self.pending_transactions
        }
        self.pending_transactions = []
        self.chain.append(block)
        return block

    def get_last_block(self):
        return self.chain[-1]

    def add_transaction(self, sender, receiver, amount, category):
        transaction = {
            'sender': sender,
            'receiver': receiver,
            'amount': amount,
            'category': category,
            'timestamp': str(datetime.datetime.now())
        }
        self.pending_transactions.append(transaction)
        return self.get_last_block()['index'] + 1

    def hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

blockchain = Blockchain()

# Seed some data
blockchain.add_transaction("Global Aid Fund", "Local NGO Alpha", 50000, "Initial Grant")
blockchain.create_block(proof=12345, previous_hash=blockchain.hash(blockchain.get_last_block()))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chain', methods=['GET'])
def get_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain)
    }
    return jsonify(response)

@app.route('/api/transaction/new', methods=['POST'])
def new_transaction():
    values = request.get_json()
    required = ['sender', 'receiver', 'amount', 'category']
    if not all(k in values for k in required):
        return 'Missing values', 400

    index = blockchain.add_transaction(values['sender'], values['receiver'], values['amount'], values['category'])
    
    # Auto-mine for demo purposes
    previous_block = blockchain.get_last_block()
    previous_hash = blockchain.hash(previous_block)
    block = blockchain.create_block(proof=12345, previous_hash=previous_hash)
    
    response = {'message': f'Transaction added to Block {index}'}
    return jsonify(response), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)
