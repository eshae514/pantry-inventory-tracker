'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '@/firebase';

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff', // White background for modal
  border: '2px solid #ff5722', // Orange border for modal
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Tracker() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    /*
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
    */
   <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="#ff5722">
            Add Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
              sx={{ borderColor: '#ff5722', color: '#ff5722' }} // Orange border and text
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box
        width="100%"
        maxWidth="800px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        border="1px solid #ff5722" // Orange border
        padding={2}
        bgcolor="#ffccbc" // Light orange background for content area
        sx={{ borderRadius: 1, boxShadow: 2 }} // Add border radius and shadow
      >
        <Box
          width="100%"
          height="100px"
          bgcolor="#ffab91" // Slightly darker orange
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" color="#fff" textAlign="center">
            Inventory Items
          </Typography>
        </Box>
        <Stack width="100%" spacing={2} overflow="auto">
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              //bgcolor="#ffe0b2" // Light orange
              paddingX={5}
              borderRadius={1}
              boxShadow={1}
            >
              <Typography variant="h3" color="#ff5722" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#ff5722" textAlign="center">
                Quantity: {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => addItem(name)} sx={{ bgcolor: '#ff5722' }}>
                  Add
                </Button>
                <Button variant="contained" onClick={() => removeItem(name)} sx={{ bgcolor: '#ff5722' }}>
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
      <Box sx={{ ml: "auto" }}></Box>
      <Button variant="contained" onClick={handleOpen} sx={{ bgcolor: '#ff5722', mb: 2 }}>
        Add New Item
      </Button>
    </div>
    //</Box>
  )
}