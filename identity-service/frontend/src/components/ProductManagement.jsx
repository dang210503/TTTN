import React, { useState, useEffect } from 'react'
import { productAPI } from '../services/api'
import './Management.css'

function ProductManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    productionDate: '',
    expirationDate: ''
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const response = await productAPI.getAll()
      setProducts(response.data)
    } catch (error) {
      alert('Lỗi khi tải danh sách thuốc: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await productAPI.update(editingProduct.id, formData)
      } else {
        await productAPI.create(formData)
      }
      loadProducts()
      resetForm()
      alert(editingProduct ? 'Cập nhật thành công!' : 'Thêm mới thành công!')
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name || '',
      detail: product.detail || '',
      productionDate: product.productionDate || '',
      expirationDate: product.expirationDate || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa thuốc/dịch vụ này?')) return
    try {
      await productAPI.delete(id)
      loadProducts()
      alert('Xóa thành công!')
    } catch (error) {
      alert('Lỗi khi xóa: ' + error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      detail: '',
      productionDate: '',
      expirationDate: ''
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const isExpired = (expirationDate) => {
    if (!expirationDate) return false
    return new Date(expirationDate) < new Date()
  }

  const isExpiringSoon = (expirationDate) => {
    if (!expirationDate) return false
    const expDate = new Date(expirationDate)
    const today = new Date()
    const daysUntilExp = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24))
    return daysUntilExp > 0 && daysUntilExp <= 30
  }

  return (
    <div className="management-container">
      <div className="management-header">
        <h2>💊 Quản Lý Thuốc & Dịch Vụ</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✖ Đóng' : '+ Thêm Mới'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingProduct ? 'Chỉnh Sửa' : 'Thêm Mới'} Thuốc/Dịch Vụ</h3>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-grid">
              <div className="form-group">
                <label>Tên thuốc/dịch vụ *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  minLength={3}
                />
              </div>
              <div className="form-group full-width">
                <label>Chi tiết</label>
                <textarea
                  value={formData.detail}
                  onChange={(e) => setFormData({...formData, detail: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Ngày sản xuất</label>
                <input
                  type="date"
                  value={formData.productionDate}
                  onChange={(e) => setFormData({...formData, productionDate: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Hạn sử dụng</label>
                <input
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingProduct ? 'Cập nhật' : 'Thêm mới'}
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
                <th>Tên thuốc/dịch vụ</th>
                <th>Chi tiết</th>
                <th>Ngày SX</th>
                <th>Hạn SD</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    Chưa có dữ liệu
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const expired = isExpired(product.expirationDate)
                  const expiringSoon = isExpiringSoon(product.expirationDate)
                  return (
                    <tr key={product.id} className={expired ? 'row-expired' : ''}>
                      <td><strong>{product.name}</strong></td>
                      <td>{product.detail || '-'}</td>
                      <td>{product.productionDate || '-'}</td>
                      <td>{product.expirationDate || '-'}</td>
                      <td>
                        {expired ? (
                          <span className="badge badge-danger">Hết hạn</span>
                        ) : expiringSoon ? (
                          <span className="badge badge-warning">Sắp hết hạn</span>
                        ) : (
                          <span className="badge badge-success">Còn hạn</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(product)}
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          🗑️ Xóa
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProductManagement

