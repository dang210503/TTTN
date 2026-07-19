import React, { useState } from 'react'
import './App.css'
import UserManagement from './components/UserManagement'
import ProductManagement from './components/ProductManagement'
import AppointmentManagement from './components/AppointmentManagement'

function App() {
  const [activeTab, setActiveTab] = useState('appointments')

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🏥 Hệ Thống Quản Lý Phòng Khám</h1>
          <p>Quản lý người dùng, thuốc và lịch khám</p>
        </div>
      </header>

      <nav className="app-nav">
        <button 
          className={activeTab === 'appointments' ? 'active' : ''}
          onClick={() => setActiveTab('appointments')}
        >
          📅 Lịch Khám
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          👥 Người Dùng
        </button>
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          💊 Thuốc & Dịch Vụ
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'appointments' && <AppointmentManagement />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'products' && <ProductManagement />}
      </main>
    </div>
  )
}

export default App

