// Centralized state -> city mapping.
// Kept in one place so no city list is ever duplicated across components.
export const locations = {
  'Uttar Pradesh': ['Noida', 'Ghaziabad', 'Meerut', 'Lucknow', 'Agra'],
  'Delhi': ['New Delhi', 'Rohini', 'Dwarka', 'Saket'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Hisar'],
  'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota'],
}

export const states = Object.keys(locations)

export const pronounOptions = ['He/Him', 'She/Her', 'They/Them', 'Prefer not to say']
