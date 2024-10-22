import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../firebase';
import ConfirmDeleteModal from './ConfirmDeleteModal'; // Import the new modal component
import '../styles.css';

// Initialize Firestore
const db = getFirestore(app);

const DataPage = () => {
  const [rsvpData, setRsvpData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false); // Control the modal visibility
  const [deleteTarget, setDeleteTarget] = useState({ id: null, name: "" }); // Store the target for deletion
  const [showOnlyYes, setShowOnlyYes] = useState(false); // Control the filter state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "RSVP"));
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        
        // Sort data alphabetically by Name
        const sortedData = data.sort((a, b) => a.Name.localeCompare(b.Name));

        setRsvpData(sortedData);
        setFilteredData(sortedData); // Initialize with all data
      } catch (error) {
        console.error("Error fetching RSVP data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showOnlyYes) {
      // Filter data to show only those with Attendance = Yes
      const filtered = rsvpData.filter(entry => entry.Attendance === "Yes");
      setFilteredData(filtered);
    } else {
      setFilteredData(rsvpData); // Show all data
    }
  }, [showOnlyYes, rsvpData]);

  const handleDeleteClick = (id, name) => {
    // Set the target and show the modal
    setDeleteTarget({ id, name });
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "RSVP", deleteTarget.id));
      setRsvpData(prevData => prevData.filter(entry => entry.id !== deleteTarget.id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
    setShowModal(false); // Close the modal
  };

  const cancelDelete = () => {
    setShowModal(false); // Close the modal without deleting
  };

  const toggleFilter = () => {
    setShowOnlyYes(prev => !prev);
  };

  const totalPeople = filteredData.reduce((sum, entry) => {
    return entry.Attendance === "Yes" ? sum + entry.NumberOfPeople : sum;
  }, 0);

  return (
    <div>
      <h1>RSVP Data</h1>
      <button onClick={toggleFilter}>
        {showOnlyYes ? "Show All" : "Show Only Yes"}
      </button>
      <h3>Total People Attending: {totalPeople}</h3>
      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Attendance</th>
              <th>People</th>
              <th>Phone</th>
              <th>Actions</th> {/* New column for delete action */}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.Name}</td>
                <td>{entry.Attendance}</td>
                <td>{entry.NumberOfPeople}</td>
                <td>{entry.PhoneNumber}</td>
                <td>
                  <button onClick={() => handleDeleteClick(entry.id, entry.Name)}>Delete</button> {/* Show modal */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}

      {/* Show the confirmation modal if needed */}
      {showModal && (
        <ConfirmDeleteModal
          name={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default DataPage;
