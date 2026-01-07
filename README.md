
AidFlow is a blockchain-powered transparent ledger designed to bring trust and accountability to disaster relief distribution. By recording every transaction on an immutable blockchain, donors can verify that their contributions reach the intended beneficiaries.

## 🚀 

*   **Transparent Ledger**: A public, immutable record of all funds and resource transfers.
*   **Real-time Dashboard**: Live tracking of total funds, blocks mined, and beneficiaries reached.
*   **Visual Trust**: A modern, glassmorphic UI that visualizes the flow of aid.
*   **Blockchain Simulation**: A Python-based blockchain implementation (Proof of Work) ensuring data integrity.
*   **Transaction Categories**: Track specific aid types like Medical Supplies, Food & Water, Infrastructure, and Cash Aid.

## 🛠️ Technology Stack

*   **Backend**: Python, Flask
*   **Frontend**: HTML5, CSS3 (Glassmorphism), JavaScript
*   **Blockchain Logic**: Custom Python implementation (SHA-256 hashing, Proof of Work)

## 📦 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/aidflow.git
    cd aidflow
    ```

2.  **Install Dependencies**
    Ensure you have Python installed. Then run:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the Application**
    ```bash
    python app.py
    ```

4.  **Access the Dashboard**
    Open your browser and navigate to:
    `http://127.0.0.1:5000`

## 📖 How It Works

1.  **Initiate Transfer**: Use the form to send aid (e.g., from "Red Cross" to "Local Shelter").
2.  **Broadcast**: The transaction is added to the pending pool.
3.  **Mining**: The system automatically mines a new block (simulated Proof of Work) to secure the transaction.
4.  **Verification**: The transaction appears on the "Live Ledger" for public verification.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.

---
*Built for transparency. Powered by code.*
