// Get the add expense form and expenses table
const addExpenseForm = document.querySelector('#add-expense-form');
const expensesTableBody = document.querySelector('#expenses-table-body');
const API_URL='http://localhost:8000';
// Add an event listener to the add expense form
addExpenseForm.addEventListener('submit', async (event) => {
	// Prevent the default form submission behavior
	event.preventDefault();

	// Get the form data
	const amount = parseInt(addExpenseForm.amount.value);
	const description = addExpenseForm.description.value;
	const date = addExpenseForm.date.value;
	const category = addExpenseForm.category.value;

	try {
		// Send a POST request to the server to add the expense
		const response = await axios.post(`${API_URL}/expense`, {
			amount,
			description,
			date,
			category
		}, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		});

		// Get the new expense data from the response
		const expense = response.data;

		// Add the new expense to the table
		const row =document.createElement('tr');
		row.innerHTML = `
			<td>${expense.id}</td>
			<td>${expense.amount}</td>
			<td>${expense.description}</td>
			<td>${expense.date}</td>
			<td>${expense.category}</td>
			<td><button class="btn btn-danger btn-sm" id=${expense.id}>
			 Delete
		  </button>
		  </td>
		`;
		expensesTableBody.appendChild(row);
	} catch (error) {
		console.error(error);
	}
});

// Get the expenses for the current user
async function getExpenses() {
	try {
		// Send a GET request to the server to get the expenses
		const response = await axios.get(`${API_URL}/expense`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		});
         console.log(localStorage.getItem('token'));
		// Get the expenses data from the response
		const expenses = response.data;
        console.log(expenses);
		// Add each expense to the table
		expenses.forEach((expense) => {
			const row = document.createElement('tr');
			row.innerHTML = `
				<td>${expense.id}</td>
				<td>${expense.amount}</td>
				<td>${expense.description}</td>
				<td>${expense.date}</td>
				<td>${expense.category}</td>
				<td><button class="btn btn-danger btn-sm" id=${expense.id}>
			   Delete
			  </button>
			  </td>
			`;
			expensesTableBody.appendChild(row);
		});
	} catch (error) {
		console.error(error);
	}
}

// Call the getExpenses function to populate the table
getExpenses();
//// button in action
expensesTableBody.addEventListener('click',async(e)=>{
	try {
		e.preventDefault();
		if(e.target.tagName==='BUTTON'){
			const btn=e.target;
			console.log(btn);
			const tr=btn.parentNode.parentNode;
			
				const expenseId = btn.id;
				const response=await axios.delete(`${API_URL}/expense/${expenseId}`,{
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}});
					console.log(response.data);
				expensesTableBody.removeChild(tr);
				console.log(expenseId);
			

		}
	} catch (error) {
		console.error(error);
	}
})