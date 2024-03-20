const BASE_API = 'https://65e864024bb72f0a9c4f2afd.mockapi.io/';
const contentDiv = document.querySelector('.content');
const contentTitle = document.getElementById('content-title');
const actionDiv = document.querySelector('.action-section');
const alertContainer = document.querySelector('.alert-container');

const detailTitle = document.getElementById('detail-title');
const detailContent = document.getElementById('detail-content');

const editTitle = document.getElementById('edit-title');
const editForm = document.getElementById('edit-form');

const createTitle = document.getElementById('create-title');
const createForm = document.getElementById('create-form');
let currentFilters = {
  searchData: '',
  order: '',
  isUsed: false,
};
//#region FetchAPI
const fetchProducts = async () => {
  const res = await fetch(`${BASE_API}/products`);
  return res.json();
};

const fetchProductById = async (productId) => {
  const res = await fetch(`${BASE_API}/products/${productId}`);
  return res.json();
};

const fetchUsers = async () => {
  const res = await fetch(`${BASE_API}/users`);
  return res.json();
};

const fetchUserById = async (productId) => {
  const res = await fetch(`${BASE_API}/users/${productId}`);
  return res.json();
};

//#endregion

//#region Handle Product
const initializeProductPage = () => {
  actionDiv.innerHTML = `
    <div class="filter">
      <div class="searchBar">
        <span 
          class="iconify" 
          data-icon="heroicons:magnifying-glass-16-solid"
        ></span>
        <input 
          type="text" 
          placeholder="Search by product name..." 
          oninput="setProductNameFilter(this.value)">
      </div>
      <div class="sort-container">
        <select class="regular-btn-type sort-btn" id="sort-option" onchange="setProductPriceOrderFilter(this.value)">
          <option value="">None</option>
          <option value="asc">Price Asc</option>
          <option value="desc">Price Desc</option>
        </select>
      </div>
      <div class="isUsed-checkbox">
        <input id="isUsed" type="checkbox" onclick="setProductIsUsedFilter(this.checked)">
        <span>is used</span>
      </div>
    </div>
    <button class="regular-btn-type add-btn" onclick="displayCreateProductForm()">
      <span 
        class="iconify" 
        data-icon="mingcute:add-fill"
      ></span>
        Add
    </button>
  `;
  contentTitle.innerHTML = `Products`;
  handleGetAllProduct();
};

const createProduct = async (newProduct) => {
  const res = await fetch(`${BASE_API}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });
  return res.ok;
};

const updateProduct = async (updatedProduct) => {
  const res = await fetch(`${BASE_API}/products/${updatedProduct.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProduct),
  });
  return res.ok;
};

const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_API}/products/${id}`, {
    method: 'DELETE',
  });
  return res.ok;
};

const handleGetAllProduct = async () => {
  contentDiv.innerHTML = loadingScreen();
  const productList = await fetchProducts();
  if (productList.length > 0) {
    sessionStorage.setItem('product-list', JSON.stringify(productList));
    contentDiv.innerHTML = generateProductCardList(productList);
  }
};

const displayCreateProductForm = () => {
  createTitle.innerHTML = `Create Product`;
  createForm.innerHTML = generateCreateProductForm();
  createForm.addEventListener('submit', (event) => handleAddProduct(event));
  handleCreateModal(1);
};

const displayUpdateProductForm = (product) => {
  editTitle.innerHTML = `Edit Product`;
  editForm.innerHTML = generateEditProductForm();
  editForm.addEventListener('submit', (event) => handleUpdateProduct(event));
  document.getElementById('edit-product-name').value = product.name;
  document.getElementById('edit-product-type').value = product.type;
  document.getElementById('edit-product-price').value = product.price;
  document.getElementById('edit-product-quantity').value = product.quantity;
  document.getElementById('edit-product-company').value = product.company;
  document.getElementById('edit-product-isUsed').checked = product.isUsed;
  sessionStorage.setItem('selected-product-id', product.id);
  handleEditModal(1);
};

const handleAddProduct = async (event) => {
  event.preventDefault();
  const name = document.getElementById('create-product-name').value;
  const type = document.getElementById('create-product-type').value;
  const price = document.getElementById('create-product-price').value;
  const quantity = document.getElementById('create-product-quantity').value;
  const company = document.getElementById('create-product-company').value;
  const isUsed = document.getElementById('create-product-isUsed').checked;

  const newProduct = {
    name,
    type,
    quantity,
    price,
    company,
    isUsed,
  };

  const isCreated = await createProduct(newProduct);
  if (isCreated) {
    openSuccessMsg();
    handleGetAllProduct();
  } else {
    openErrorMsg();
  }
  handleCreateModal(0);
};

const handleUpdateProduct = async (event) => {
  event.preventDefault();
  handleEditModal(0);
  const name = document.getElementById('edit-product-name').value;
  const type = document.getElementById('edit-product-type').value;
  const price = document.getElementById('edit-product-price').value;
  const quantity = document.getElementById('edit-product-quantity').value;
  const company = document.getElementById('edit-product-company').value;
  const isUsed = document.getElementById('edit-product-isUsed').checked;

  const updatedProduct = {
    id: sessionStorage.getItem('selected-product-id'),
    name,
    type,
    quantity,
    price,
    company,
    isUsed,
  };

  const isUpdated = await updateProduct(updatedProduct);
  if (isUpdated) {
    openSuccessMsg();
    handleGetAllProduct();
  } else {
    openErrorMsg();
  }
  handleEditModal(0);
};

const handleDeleteProduct = async (productId) => {
  try {
    await deleteProduct(productId);
    openSuccessMsg();
    handleGetAllProduct();
  } catch (err) {
    console.log(err);
    openErrorMsg();
  }
};

const filterProductList = (filters) => {
  const productList = sessionStorage.getItem('product-list');
  let newProductList = JSON.parse(productList);
  if (filters.isUsed) {
    newProductList = newProductList.filter((product) => product.isUsed);
  }
  if (filters.name) {
    newProductList = newProductList.filter((product) =>
      product.name.toLowerCase().includes(filters.name),
    );
  }
  if (filters.order === 'asc') {
    newProductList.sort((a, b) => a.price - b.price);
  } else if (filters.order === 'desc') {
    newProductList.sort((a, b) => b.price - a.price);
  }
  contentDiv.innerHTML =
    newProductList.length > 0
      ? generateProductCardList(newProductList)
      : noResultScreen();
};

const setProductIsUsedFilter = (isEnable) => {
  currentFilters.isUsed = isEnable;
  filterProductList(currentFilters);
};

const setProductPriceOrderFilter = (order) => {
  currentFilters.order = order;
  filterProductList(currentFilters);
};

const setProductNameFilter = (name) => {
  currentFilters.name = name.toLowerCase();
  filterProductList(currentFilters);
};

const generateProductCardList = (productList) => {
  return `
    <div class="grid-container">
      ${productList.map((product) => generateProductCard(product)).join('')}
    </div>
    `;
};

const generateProductCard = (product) => {
  return `
    <div class="card base-info">
      <p><strong>ID:</strong> ${product.id}</p>
      <p><strong>Name:</strong> ${product.name}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Is Used:</strong> ${product.isUsed}</p>
      <div class="btn-container">
        <span
          class="circle-btn-type viewDetail-btn iconify"
          onclick="viewDetailProduct(${product.id})"
          data-icon="gg:details-more"
        ></span>
        <span
          class="circle-btn-type edit-btn iconify"
          onclick='displayUpdateProductForm(${JSON.stringify(product)})'
          data-icon="lucide:edit"
        ></span>
        <span
          class="circle-btn-type delete-btn iconify"
          onclick='handleDeleteProduct(${JSON.stringify(product.id)})'
          data-icon="ion:trash-outline"
        ></span>
      </div>
    </div>
    `;
};

const generateCreateProductForm = () => {
  return `
    <div class="input-textBox">
      <label for="name">Name</label
      ><input id="create-product-name" type="text" required />
    </div>
    <div class="input-textBox">
      <label for="type">Type</label
      ><input id="create-product-type" type="text" required />
    </div>
    <div class="input-textBox">
      <label for="quantity">Quantity</label
      ><input id="create-product-quantity" type="text" required />
    </div>
    <div class="input-textBox">
      <label for="price">Price</label
      ><input id="create-product-price" type="text" required />
    </div>
    <div class="input-textBox">
      <label for="company">Company</label
      ><input id="create-product-company" type="text" required />
    </div>
    <div class="input-checkBox">
      <input id="create-product-isUsed" type="checkbox" />
      <label for="isUsed">is used</label>
    </div>
  `;
};

const generateEditProductForm = () => {
  return `
  <div class="input-textBox">
    <label for="name">Name</label
    ><input id="edit-product-name" type="text" required />
  </div>
  <div class="input-textBox">
    <label for="type">Type</label
    ><input id="edit-product-type" type="text" required />
  </div>
  <div class="input-textBox">
    <label for="quantity">Quantity</label
    ><input id="edit-product-quantity" type="text" required />
  </div>
  <div class="input-textBox">
    <label for="price">Price</label
    ><input id="edit-product-price" type="text" required />
  </div>
  <div class="input-textBox">
    <label for="company">Company</label
    ><input id="edit-product-company" type="text" required />
  </div>
  <div class="input-checkBox">
    <input id="edit-product-isUsed" type="checkbox" />
    <label for="isUsed">is used</label>
  </div>
  `;
};

const viewDetailProduct = async (productId) => {
  const product = await fetchProductById(productId);
  detailTitle.innerHTML = `Product Detail Title`;
  detailContent.innerHTML = `
    <div class="base-info">
      <p><strong>ID:</strong> ${product.id}</p>
      <p><strong>Name:</strong> ${product.name}</p>
      <p><strong>Type:</strong> ${product.type}</p>
      <p><strong>Quantity:</strong> ${product.quantity}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Company:</strong> ${product.company}</p>
      <p><strong>Is Used:</strong> ${product.isUsed}</p>
    </div>
  `;
  handleDetailModal(1);
};

//#endregion

//#region Handle User
const initializeUserPage = () => {
  actionDiv.innerHTML = `
    <div class="searchBar">
      <span 
        class="iconify" 
        data-icon="heroicons:magnifying-glass-16-solid"
      ></span>
      <input 
        type="text" 
        placeholder="Search by user name..." 
        oninput="filterProductByName(this.value)">
    </div>
    <button class="regular-btn-type add-btn" onclick="displayCreateProductForm()">
      <span 
        class="iconify" 
        data-icon="mingcute:add-fill"
      ></span>
        Add
    </button>
  `;
  contentTitle.innerHTML = `Users`;
  handleGetAllUser();
};

const createUser = async (newUser) => {
  const res = await fetch(`${BASE_API}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  return res.ok;
};

const updateUser = async (updatedUser) => {
  const res = await fetch(`${BASE_API}/users/${updatedUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  });
  return res.ok;
};

const deleteUser = async (id) => {
  const res = await fetch(`${BASE_API}/users/${id}`, {
    method: 'DELETE',
  });
  return res.ok;
};

const handleGetAllUser = async () => {
  contentDiv.innerHTML = loadingScreen();
  const userList = await fetchUsers();
  if (userList.length > 0) {
    sessionStorage.setItem('user-list', JSON.stringify(userList));
    contentDiv.innerHTML = generateUserCardList(userList);
  }
};

//#endregion

const loadingScreen = () => {
  return `
    <div class="center-text">
      <h1>Loading...</h1>
    </div>
  `;
};

const noResultScreen = () => {
  return `
    <div class="center-text">
      <h1>No Result</h1>
    </div>
  `;
};

const handleDetailModal = (val) => {
  document.getElementById('detailModal').style.display =
    val === 0 ? 'none' : 'block';
};

const handleCreateModal = (val) => {
  document.getElementById('createModal').style.display =
    val === 0 ? 'none' : 'block';
};

const handleEditModal = (val) => {
  document.getElementById('editModal').style.display =
    val === 0 ? 'none' : 'block';
};

const openSuccessMsg = () => {
  alertContainer.style.display = 'block';
  alertContainer.innerHTML = `
    <div class="alert-msg success-msg-type" id="success-msg">
      <div class="alert-content">
          <span class="iconify" data-icon="ooui:success"></span>
          <strong>Success!</strong> Your submission has been saved.
      </div>
      <span
        class="alert-close iconify"
        data-icon="majesticons:close-line"
        onclick="closeAlert()"
      ></span>
    </div>
  `;
};

const openErrorMsg = () => {
  alertContainer.style.display = 'block';
  alertContainer.innerHTML = `
    <div class="alert-msg error-msg-type" id="error-msg">
      <div class="alert-content">
          <span class="iconify" data-icon="ooui:error"></span>
          <strong>Error!</strong> A problem has been occurred while
          submitting.
      </div>
      <span
        class="alert-close iconify"
        data-icon="majesticons:close-line"
        onclick="closeAlert()"
      ></span>
    </div>
  `;
  contentDiv.innerHTML = loadingScreen();
};

const closeAlert = () => {
  alertContainer.style.display = 'none';
};
