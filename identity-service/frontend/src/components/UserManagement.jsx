import React, { useState, useEffect } from 'react'
import { userAPI } from '../services/api'
import './Management.css'

function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
    role: 'PATIENT'
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const response = await userAPI.getAll()
      setUsers(response.data)
    } catch (error) {
      alert('Lỗi khi tải danh sách bệnh nhân: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingUser) {
        await userAPI.update(editingUser.id, formData)
      } else {
        await userAPI.create(formData)
      }
      loadUsers()
      resetForm()
      alert(editingUser ? 'Cập nhật thành công!' : 'Thêm mới thành công!')
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      username: user.username || '',
      password: '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      dob: user.dob || '',
      phone: user.phone || '',
      email: user.email || '',
      address: user.address || '',
      role: user.role || 'PATIENT'
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa bệnh nhân này?')) return
    try {
      await userAPI.delete(id)
      loadUsers()
      alert('Xóa thành công!')
    } catch (error) {
      alert('Lỗi khi xóa: ' + error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
      email: '',
      address: '',
      role: 'PATIENT'
    })
    setEditingUser(null)
    setShowForm(false)
  }

  const getRoleLabel = (role) => {
    const labels = {
      'PATIENT': 'Bệnh nhân',
      'DOCTOR': 'Bác sĩ',
      'STAFF': 'Nhân viên'
    }
    return labels[role] || role
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>👥 Quản Lý Người Dùng</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✖ Đóng' : '+ Thêm Mới'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingUser ? 'Chỉnh Sửa' : 'Thêm Mới'} Bệnh Nhân</h3>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-grid">
              <div className="form-group">
                <label>Tên đăng nhập *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                  disabled={!!editingUser}
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu {!editingUser && '*'}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required={!editingUser}
                />
              </div>
              <div className="form-group">
                <label>Họ *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tên *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ngày sinh</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Vai trò *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  required
                >
                  <option value="PATIENT">Bệnh nhân</option>
                  <option value="DOCTOR">Bác sĩ</option>
                  <option value="STAFF">Nhân viên</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingUser ? 'Cập nhật' : 'Thêm mới'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Đang tải...</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Họ Tên</th>
                <th>Username</th>
                <th>SĐT</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    Chưa có dữ liệu
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.username}</td>
                    <td>{user.phone || '-'}</td>
                    <td>{user.email || '-'}</td>
                    <td>
                      <span className={`badge badge-${user.role?.toLowerCase()}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(user)}
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(user.id)}
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserManagement

