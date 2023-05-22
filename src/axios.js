const getBtn = document.getElementById('get-data');
const getname = document.getElementById('name');

const getBtnn = document.getElementById('get-dataid');
const getnamee = document.getElementById('namee');

const postBtn = document.getElementById('post-data');
const postname = document.getElementById('postname');

const delBtn = document.getElementById('del-data');
const delid = document.getElementById('delid');

const nameInput = document.getElementById("name");
const authorInput = document.getElementById("author");
const btn = document.getElementById("btn");

// const axios = require('axios').default;

const getdata = () => {
    axios.get('https://temi-api.vercel.app//books/data').then(response => {
        console.log(response.data.data);
        const x = response.data.data;
        const datajason = JSON.stringify(x)
        console.log(datajason);
        getname.innerHTML = datajason;
});
};

const getiddata = () => {
    
        axios.get('https://temi-api.vercel.app//book/2').then(response => {
            console.log(response.data.data);
            const x = response.data.data;
            const datajason = JSON.stringify(x)
            console.log(datajason);
            getnamee.innerHTML = datajason;

});
};

const postdata = () => {
    axios.post('https://temi-api.vercel.app//book', {
        name: 'Fred',
        author: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

const deldata = () => {
  
}


btn.addEventListener("click", () => {
  const name = nameInput.value;
  const author = authorInput.value;

  axios.post("https://temi-api.vercel.app//book", {
      name: name,
      author: author
    })
    .then((response) => {
      console.log(response);
    });
});


getBtn.addEventListener('click', getdata);
getBtnn.addEventListener('click', getiddata);
postBtn.addEventListener('click', postdata);
delBtn.addEventListener('click', deldata);

