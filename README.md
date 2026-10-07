### School Inventory Management System

A comprehensive web-based inventory management system designed for Kenyan schools to manage uniforms, kitchen items, and classroom resources.

## Authentication & Registration

Login Credentials
The system includes built-in user authentication with registration capabilities controlled by a registration key.

Demo Accounts:
- **Username:** `admin` | **Password:** `password123`
- **Username:** `teacher` | **Password:** `teacher123`
- **Username:** `manager` | **Password:** `manager123`

### Registration
New users can create accounts by:
1. Clicking "Create New Account" on the login page
2. Filling in their details (Name, Username, Email, Password)
3. Entering the **Registration Key: `SCHOOL2026`**

This key prevents unauthorized registrations and ensures only authorized personnel can access the system.


```

## Features

### Uniform Management
- Add uniforms with type, quantity, size, and condition
- Track uniform conditions (New, Good, Fair, Damaged)
- Organize uniforms by size categories
- View all uniforms in a detailed table

### Kitchen Inventory
- Manage popular Kenyan school foods:
  - Ugali (Cornmeal)
  - Rice
  - Beans
  - Sukuma Wiki (Kale)
  - Nyama (Meat)
  - Vegetables (Cabbage, Potatoes, Carrots, Onions, Tomatoes)
  - Cooking Oil
  - Dairy (Milk, Eggs)
  - And more...
- Track quantities in kg, liters, or units
- Monitor food condition (Fresh, Good, Fair, Spoiled)
- Prevent waste by tracking item freshness

### Classroom Inventory
- Organize resources by individual classes
- Manage items per class:
  - Teacher Desks
  - Student Desks
  - Student Chairs
  - Whiteboards
- Track condition of each item
- View complete inventory breakdown by classroom

###  Dashboard & Analytics
- **Uniform Condition Chart**: Doughnut chart showing uniform distribution by condition
- **Kitchen Items Overview**: Bar chart of top kitchen items
- **Classroom Items Inventory**: Radar chart showing classroom resource distribution
- **Condition Summary**: Pie chart of all items by condition
- **Statistics Cards**: Quick stats showing:
  - Total uniforms
  - Kitchen items
  - Active classes
  - Total desks available

## How to Use

### Getting Started
1. Extract the files to your desired location
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari)
3. The system automatically saves data to your browser's local storage

### Adding Uniforms
1. Click the ** Uniforms** tab
2. Fill in:
   - Uniform Type (e.g., Shirt, Skirt, Trousers)
   - Quantity
   - Size (S, M, L, XL, etc.)
   - Condition
   - Date
3. Click "Add Uniform"

### Managing Kitchen Items
1. Click the ** Kitchen** tab
2. Select a food item from the dropdown
3. Enter quantity and unit (kg, liters, units, dozens)
4. Select condition (Fresh, Good, Fair, Spoiled)
5. Click "Add Item"

### Managing Classrooms
1. Click the ** Classrooms** tab
2. Enter class name (e.g., Form 1A, Form 2B) and click "Add Class"
3. For each class, add items:
   - Select item type (Teacher Desk, Student Desk, etc.)
   - Enter quantity
   - Select condition
   - Click "Add Item"
4. View all items in the class card
5. Remove items or delete entire classes as needed

### Viewing Dashboard
1. Click the ** Dashboard** tab
2. View all charts and statistics
3. Charts update automatically as you add/remove items
4. Use statistics cards for quick overview

## Data Storage
- All data is stored locally in your browser
- Data persists between sessions
- No data is sent to external servers
- To backup your data, export it before clearing browser data

## Technical Details
- **Technology**: HTML5, CSS3, JavaScript (Vanilla)
- **Charts**: Chart.js library
- **Storage**: Browser LocalStorage API
- **Compatibility**: Works on all modern browsers
- **Responsive**: Mobile-friendly design

## Browser Support
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari
- Any modern browser with ES6 support

## Tips & Best Practices
1. **Regular Updates**: Update inventory regularly to maintain accuracy
2. **Condition Tracking**: Always select appropriate condition to monitor item quality
3. **Class Organization**: Use consistent naming for classes (e.g., Form 1A, Form 1B)
4. **Date Tracking**: Monitor dates to identify old items that need replacement
5. **Dashboard Review**: Check the dashboard periodically to plan purchases

## Troubleshooting

**Data Lost?**
- Check if you cleared browser data/cache
- Try using a different browser
- Consider exporting data regularly

**Charts Not Showing?**
- Refresh the page
- Ensure you have items in the respective sections
- Check browser console for errors

**Form Not Submitting?**
- Ensure all required fields are filled
- Check for validation messages
- Try refreshing the page

## Future Enhancements
- PDF report generation
- Data export to Excel
- User authentication for multi-user access
- Backup to cloud storage
- Barcode scanning integration
- Low stock alerts
- Expiry date tracking for kitchen items

## Support
For issues or suggestions, review the code comments and ensure:
1. All browsers are up to date
2. JavaScript is enabled
3. Local storage is available
4. Pop-ups are not blocked

---

**Designed for**: Kenyan Schools
