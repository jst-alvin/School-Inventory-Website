// Initialize data from localStorage
let data = {
    uniforms: JSON.parse(localStorage.getItem('uniforms')) || [],
    kitchenItems: JSON.parse(localStorage.getItem('kitchenItems')) || [],
    classrooms: JSON.parse(localStorage.getItem('classrooms')) || []
};

// Set today's date as default
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('uniformDate').value = today;
    document.getElementById('kitchenDate').value = today;
    
    loadAllData();
    setupNavigation();
});

// Setup Navigation
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.dataset.section;
            showSection(section);
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    // Remove active from all buttons
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    event.target.classList.add('active');
    
    // Update charts if dashboard
    if (sectionName === 'dashboard') {
        setTimeout(updateDashboard, 100);
    }
}

// ========== UNIFORMS SECTION ==========
function addUniform() {
    const type = document.getElementById('uniformType').value.trim();
    const quantity = parseInt(document.getElementById('uniformQuantity').value);
    const size = document.getElementById('uniformSize').value.trim();
    const condition = document.getElementById('uniformCondition').value;
    const date = document.getElementById('uniformDate').value;

    if (!type || !quantity || !size || !condition || !date) {
        alert('Please fill all fields');
        return;
    }

    const uniform = {
        id: Date.now(),
        type,
        quantity,
        size,
        condition,
        date
    };

    data.uniforms.push(uniform);
    saveData();
    loadUniforms();
    clearUniformForm();
}

function clearUniformForm() {
    document.getElementById('uniformType').value = '';
    document.getElementById('uniformQuantity').value = '';
    document.getElementById('uniformSize').value = '';
    document.getElementById('uniformCondition').value = '';
    document.getElementById('uniformDate').value = new Date().toISOString().split('T')[0];
}

function loadUniforms() {
    const tbody = document.getElementById('uniformsBody');
    tbody.innerHTML = '';

    if (data.uniforms.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-message">No uniforms added yet</td></tr>';
        return;
    }

    data.uniforms.forEach(uniform => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${uniform.type}</td>
            <td>${uniform.quantity}</td>
            <td>${uniform.size}</td>
            <td><span class="condition-badge condition-${uniform.condition.toLowerCase()}">${uniform.condition}</span></td>
            <td>${uniform.date}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteUniform(${uniform.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteUniform(id) {
    if (confirm('Are you sure you want to delete this uniform?')) {
        data.uniforms = data.uniforms.filter(u => u.id !== id);
        saveData();
        loadUniforms();
    }
}

// ========== KITCHEN SECTION ==========
function addKitchenItem() {
    const item = document.getElementById('kitchenItem').value;
    const quantity = parseFloat(document.getElementById('kitchenQuantity').value);
    const unit = document.getElementById('kitchenUnit').value;
    const condition = document.getElementById('kitchenCondition').value;
    const date = document.getElementById('kitchenDate').value;

    if (!item || !quantity || !condition || !date) {
        alert('Please fill all fields');
        return;
    }

    const kitchenItem = {
        id: Date.now(),
        item,
        quantity,
        unit,
        condition,
        date
    };

    data.kitchenItems.push(kitchenItem);
    saveData();
    loadKitchenItems();
    clearKitchenForm();
}

function clearKitchenForm() {
    document.getElementById('kitchenItem').value = '';
    document.getElementById('kitchenQuantity').value = '';
    document.getElementById('kitchenUnit').value = 'kg';
    document.getElementById('kitchenCondition').value = '';
    document.getElementById('kitchenDate').value = new Date().toISOString().split('T')[0];
}

function loadKitchenItems() {
    const tbody = document.getElementById('kitchenBody');
    tbody.innerHTML = '';

    if (data.kitchenItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-message">No kitchen items added yet</td></tr>';
        return;
    }

    data.kitchenItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.item}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td><span class="condition-badge condition-${item.condition.toLowerCase()}">${item.condition}</span></td>
            <td>${item.date}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteKitchenItem(${item.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteKitchenItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        data.kitchenItems = data.kitchenItems.filter(k => k.id !== id);
        saveData();
        loadKitchenItems();
    }
}

// ========== CLASSROOMS SECTION ==========
function quickAddClass(className) {
    // Check if class already exists
    if (data.classrooms.find(c => c.name === className)) {
        alert(`${className} already exists`);
        return;
    }

    const classroom = {
        id: Date.now(),
        name: className,
        items: []
    };

    data.classrooms.push(classroom);
    saveData();
    loadClassrooms();
}

function addClass() {
    const className = document.getElementById('className').value.trim();
    
    if (!className) {
        alert('Please enter a class name');
        return;
    }

    // Check if class already exists
    if (data.classrooms.find(c => c.name === className)) {
        alert('This class already exists');
        return;
    }

    const classroom = {
        id: Date.now(),
        name: className,
        items: []
    };

    data.classrooms.push(classroom);
    saveData();
    loadClassrooms();
    document.getElementById('className').value = '';
}

function loadClassrooms() {
    const container = document.getElementById('classroomItems');
    container.innerHTML = '';

    if (data.classrooms.length === 0) {
        container.innerHTML = '<p class="empty-message">No classes added yet. Add a class first.</p>';
        return;
    }

    data.classrooms.forEach(classroom => {
        const card = document.createElement('div');
        card.className = 'classroom-card';
        card.innerHTML = `
            <h3>
                ${classroom.name}
                <button class="btn btn-danger" onclick="deleteClassroom(${classroom.id})" style="width: auto; padding: 5px 10px; font-size: 0.8em;">Delete</button>
            </h3>
            
            <div style="margin-bottom: 20px;">
                <h4 style="color: #555; margin-bottom: 10px;">Add Item to Class</h4>
                <select id="itemType-${classroom.id}" style="margin-bottom: 10px;">
                    <option value="">Select Item Type</option>
                    <option value="Teacher Desk">Teacher Desk</option>
                    <option value="Student Desk">Student Desk</option>
                    <option value="Student Chair">Student Chair</option>
                    <option value="Whiteboard">Whiteboard</option>
                </select>
                <input type="number" id="itemQty-${classroom.id}" placeholder="Quantity" min="0" style="margin-bottom: 10px;">
                <select id="itemCondition-${classroom.id}" style="margin-bottom: 10px;">
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Damaged">Damaged</option>
                </select>
                <button class="btn btn-primary" onclick="addClassroomItem(${classroom.id})">Add Item</button>
            </div>

            <div class="classroom-items-list" id="items-${classroom.id}">
                ${renderClassroomItems(classroom)}
            </div>
        `;
        container.appendChild(card);
    });
}

function renderClassroomItems(classroom) {
    if (classroom.items.length === 0) {
        return '<p style="color: #999; text-align: center;">No items added to this class</p>';
    }

    return classroom.items.map(item => `
        <div class="item-row">
            <div>
                <strong>${item.type}</strong>
                <span>Qty: ${item.quantity} | Condition: <span class="condition-badge condition-${item.condition.toLowerCase()}">${item.condition}</span></span>
            </div>
            <button class="btn btn-danger" onclick="deleteClassroomItem(${classroom.id}, ${item.id})">Remove</button>
        </div>
    `).join('');
}

function addClassroomItem(classroomId) {
    const itemType = document.getElementById(`itemType-${classroomId}`).value;
    const quantity = parseInt(document.getElementById(`itemQty-${classroomId}`).value);
    const condition = document.getElementById(`itemCondition-${classroomId}`).value;

    if (!itemType || !quantity || !condition) {
        alert('Please fill all fields');
        return;
    }

    const classroom = data.classrooms.find(c => c.id === classroomId);
    if (classroom) {
        classroom.items.push({
            id: Date.now(),
            type: itemType,
            quantity,
            condition
        });
        saveData();
        loadClassrooms();
    }
}

function deleteClassroomItem(classroomId, itemId) {
    const classroom = data.classrooms.find(c => c.id === classroomId);
    if (classroom) {
        classroom.items = classroom.items.filter(item => item.id !== itemId);
        saveData();
        loadClassrooms();
    }
}

function deleteClassroom(classroomId) {
    if (confirm('Are you sure you want to delete this class and all its items?')) {
        data.classrooms = data.classrooms.filter(c => c.id !== classroomId);
        saveData();
        loadClassrooms();
    }
}

// ========== DASHBOARD SECTION ==========
let charts = {};

function updateDashboard() {
    updateStats();
    updateCharts();
}

function updateStats() {
    const totalUniforms = data.uniforms.reduce((sum, u) => sum + u.quantity, 0);
    const totalKitchenItems = data.kitchenItems.length;
    const totalClasses = data.classrooms.length;
    const totalDesks = data.classrooms.reduce((sum, c) => {
        const desks = c.items.filter(i => i.type.includes('Desk')).reduce((s, i) => s + i.quantity, 0);
        return sum + desks;
    }, 0);

    document.getElementById('totalUniforms').textContent = totalUniforms;
    document.getElementById('totalKitchenItems').textContent = totalKitchenItems;
    document.getElementById('totalClasses').textContent = totalClasses;
    document.getElementById('totalDesks').textContent = totalDesks;
}

function updateCharts() {
    updateUniformConditionChart();
    updateKitchenItemChart();
    updateClassroomChart();
    updateConditionSummaryChart();
}

function updateUniformConditionChart() {
    const conditions = {};
    data.uniforms.forEach(u => {
        conditions[u.condition] = (conditions[u.condition] || 0) + u.quantity;
    });

    const ctx = document.getElementById('uniformConditionChart').getContext('2d');
    
    if (charts.uniformCondition) {
        charts.uniformCondition.destroy();
    }

    charts.uniformCondition = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(conditions),
            datasets: [{
                data: Object.values(conditions),
                backgroundColor: [
                    '#28a745',
                    '#17a2b8',
                    '#ffc107',
                    '#dc3545'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function updateKitchenItemChart() {
    const items = {};
    data.kitchenItems.forEach(k => {
        items[k.item] = (items[k.item] || 0) + k.quantity;
    });

    const topItems = Object.entries(items)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .reduce((obj, [key, val]) => {
            obj[key] = val;
            return obj;
        }, {});

    const ctx = document.getElementById('kitchenItemChart').getContext('2d');
    
    if (charts.kitchenItem) {
        charts.kitchenItem.destroy();
    }

    charts.kitchenItem = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(topItems),
            datasets: [{
                label: 'Quantity',
                data: Object.values(topItems),
                backgroundColor: 'rgba(102, 126, 234, 0.7)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateClassroomChart() {
    const itemTypes = {};
    data.classrooms.forEach(c => {
        c.items.forEach(item => {
            itemTypes[item.type] = (itemTypes[item.type] || 0) + item.quantity;
        });
    });

    const ctx = document.getElementById('classroomChart').getContext('2d');
    
    if (charts.classroom) {
        charts.classroom.destroy();
    }

    charts.classroom = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(itemTypes),
            datasets: [{
                label: 'Quantity by Type',
                data: Object.values(itemTypes),
                backgroundColor: 'rgba(102, 126, 234, 0.3)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateConditionSummaryChart() {
    const allConditions = {};

    // Count uniforms by condition
    data.uniforms.forEach(u => {
        allConditions[u.condition] = (allConditions[u.condition] || 0) + u.quantity;
    });

    // Count classroom items by condition
    data.classrooms.forEach(c => {
        c.items.forEach(item => {
            allConditions[item.condition] = (allConditions[item.condition] || 0) + item.quantity;
        });
    });

    // Count kitchen items by condition
    data.kitchenItems.forEach(k => {
        allConditions[k.condition] = (allConditions[k.condition] || 0) + 1;
    });

    const ctx = document.getElementById('conditionSummaryChart').getContext('2d');
    
    if (charts.conditionSummary) {
        charts.conditionSummary.destroy();
    }

    charts.conditionSummary = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(allConditions),
            datasets: [{
                data: Object.values(allConditions),
                backgroundColor: [
                    '#28a745',
                    '#17a2b8',
                    '#ffc107',
                    '#dc3545',
                    '#6c757d'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// ========== STORAGE ==========
function saveData() {
    localStorage.setItem('uniforms', JSON.stringify(data.uniforms));
    localStorage.setItem('kitchenItems', JSON.stringify(data.kitchenItems));
    localStorage.setItem('classrooms', JSON.stringify(data.classrooms));
}

function loadAllData() {
    loadUniforms();
    loadKitchenItems();
    loadClassrooms();
}

// Export data as JSON
function exportData() {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inventory-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}
