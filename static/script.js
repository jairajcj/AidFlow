document.addEventListener('DOMContentLoaded', () => {
    fetchChain();
    
    document.getElementById('transaction-form').addEventListener('submit', handleTransaction);
});

async function fetchChain() {
    try {
        const response = await fetch('/api/chain');
        const data = await response.json();
        renderChain(data.chain);
        updateStats(data.chain);
    } catch (error) {
        console.error('Error fetching chain:', error);
    }
}

async function handleTransaction(e) {
    e.preventDefault();
    
    const sender = document.getElementById('sender').value;
    const receiver = document.getElementById('receiver').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    
    const payload = {
        sender,
        receiver,
        amount: parseFloat(amount),
        category
    };

    try {
        const response = await fetch('/api/transaction/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            // Clear form
            document.getElementById('receiver').value = '';
            document.getElementById('amount').value = '';
            
            // Refresh Data
            fetchChain();
        } else {
            alert('Transaction failed!');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderChain(chain) {
    const container = document.getElementById('chain-container');
    container.innerHTML = '';
    
    // Reverse chain to show newest first
    const reversedChain = [...chain].reverse();
    
    reversedChain.forEach(block => {
        if (block.transactions.length === 0) return; // Skip empty blocks if any
        
        block.transactions.forEach(tx => {
            const el = document.createElement('div');
            el.className = 'block-entry';
            
            el.innerHTML = `
                <div class="block-header">
                    <span>Block #${block.index}</span>
                    <span>${formatTime(tx.timestamp)}</span>
                </div>
                <div class="tx-details">
                    <div class="tx-meta">
                        <span class="sender-receiver">${tx.sender} <i class="fa-solid fa-arrow-right-long" style="color: #64748b; font-size: 0.8rem;"></i> ${tx.receiver}</span>
                        <span style="font-size: 0.8rem; color: #94a3b8;">${tx.category}</span>
                    </div>
                    <div class="tx-amount">$${tx.amount.toLocaleString()}</div>
                </div>
                <div class="hash-preview" title="Block Hash: ${block.previous_hash}">
                    Hash: 0x${block.previous_hash.substring(0, 30)}...
                </div>
            `;
            container.appendChild(el);
        });
    });
}

function updateStats(chain) {
    let total = 0;
    
    chain.forEach(block => {
        block.transactions.forEach(tx => {
            if (tx.amount) total += tx.amount;
        });
    });
    
    document.getElementById('total-funds').textContent = `$${total.toLocaleString()}`;
    document.getElementById('total-blocks').textContent = chain.length;
    // Mock user count for now or calculate unique senders/receivers
    const users = new Set();
    chain.forEach(block => {
        block.transactions.forEach(tx => {
            users.add(tx.sender);
            users.add(tx.receiver);
        });
    });
    document.getElementById('total-users').textContent = users.size;
}

function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
