
    const output = document.getElementById('output');

    //we are creating table with createTable
    function createTable(dataArray, title) {
      const mainDiv = document.createElement('div');
      const table = document.createElement('table');
      const heading = document.createElement('h1');
      heading.textContent = title;
      mainDiv.appendChild(heading);
      table.classList.add('table','table-striped','table-bordered');
      mainDiv.classList.add('overflow-scroll');
      heading.classList.add('my-4', 'px-4');


      if (dataArray.length === 0) {
        mainDiv.appendChild(table);
        return mainDiv;
      }

      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');

      // Create headers from keys of the first object
      Object.keys(dataArray[0]).forEach((key, index) => {
        const th = document.createElement('th');
        th.textContent = key;
        if(title === 'Products'){
          if(index===2 || index === 10){
            th.classList.add('th-width');
            // th.style.width = '300px';
          }
        }
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      dataArray.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
          const td = document.createElement('td');
          td.textContent = typeof value === 'object' ? JSON.stringify(value) : value;
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      mainDiv.appendChild(table);
      return mainDiv;
    }

    // promise chaining starts here
    //first promise API
    function promiseAPI1() {
      return new Promise((resolve) => {
        setTimeout(() => {
          fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then(data => {
              const table = createTable(data.posts.slice(0, 5), 'Posts');
              output.appendChild(table);
              resolve();
            });
        }, 1000);
      });
    }

    //second promise API
    function promiseAPI2() {
      return new Promise((resolve) => {
        setTimeout(() => {
          fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
              const table = createTable(data.products.slice(0, 5), 'Products');
              output.appendChild(table);
              resolve();
            });
        }, 2000);
      });
    }

    // third promise API
    function promiseAPI3() {
      return new Promise((resolve) => {
        setTimeout(() => {
          fetch('https://dummyjson.com/todos')
            .then(res => res.json())
            .then(data => {
              const table = createTable(data.todos.slice(0, 5), 'Todos');
              output.appendChild(table);
              resolve();
            });
        }, 3000);
      });
    }

    document.getElementById('fetchBtn').addEventListener('click', () => {
      output.innerHTML = ''; // clear previous results
      promiseAPI1()
        .then(() => promiseAPI2())
        .then(() => promiseAPI3());
    });