import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import type { ShoppingList } from '../redux/reducers/listSlice'
import styles from './SharedListPage.module.css'

export const SharedListPage = () => {
  const { id } = useParams<{ id: string }>()
  const [list, setList] = useState<ShoppingList | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get<ShoppingList>(`http://localhost:3000/list/${id}`)
        setList(res.data)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchList()
  }, [id])

  if (loading) {
    return <div className={styles.center}>Loading...</div>
  }

  if (notFound || !list) {
    return (
      <div className={styles.center}>
        <h2>List not found</h2>
        <p>This shopping list could not be found.</p>
      </div>
    )
  }

  const checkedCount = list.items.filter(i => i.checked).length

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{list.name}</h1>
          <p className={styles.subtitle}>Shared shopping list</p>
        </div>

        {/* Info row */}
        <div className={styles.info}>
          <div className={styles.badge}>
            <span>Category</span>
            <strong>{list.category}</strong>
          </div>
          <div className={styles.badge}>
            <span>Items</span>
            <strong>{list.items.length}</strong>
          </div>
          <div className={styles.badge}>
            <span>Done</span>
            <strong>{checkedCount}/{list.items.length}</strong>
          </div>
        </div>

        {/* Notes */}
        {list.notes && (
          <p className={styles.notes}><strong>Notes:</strong> {list.notes}</p>
        )}

        {/* Items */}
        <h2 className={styles.itemsTitle}>Shopping Items</h2>

        {list.items.length === 0 ? (
          <p className={styles.empty}>This list has no items yet.</p>
        ) : (
          <div className={styles.items}>
            {list.items.map((item, index) => (
              <div key={item.id} className={`${styles.item} ${item.checked ? styles.checked : ''}`}>
                <div className={styles.number}>{index + 1}</div>

                {item.image && (
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                )}

                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemCategory}>{item.category}</p>
                  {item.notes && <p className={styles.itemNotes}>{item.notes}</p>}
                </div>

                <div className={styles.quantity}>x{item.quantity}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
