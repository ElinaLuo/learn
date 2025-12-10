new Promise((resolve, reject) => {
  console.log(1);
  new Promise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
      // 宏1
      resolve(3);
      console.log(4);
    });
  }).then((data) => {
    // 微 1
    setTimeout(() => {
      // 宏 3
      console.log(5);
    });
    console.log(data);
  });

  setTimeout(() => {
    // 宏 2
    resolve(6);
    console.log(7);
  });
}).then((data) => {
  // 微 2
  console.log(data);
  setTimeout(() => {
    // 宏 4
    console.log(8);
  });
  console.log(9);
});

// output: 1 2 4 3 7 6 9 5 8
