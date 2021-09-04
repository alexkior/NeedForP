ymaps.ready(init);
// const Point
function coordChanger(str) {
  let newStr = str.replace('{', '[').replace('}', ']');
  return newStr;
}

const btn = document.querySelector("#tyk");

// fetch("/points")
//   .then((data) => data.json())
//   .then((data) => {
//     console.log('======>', data);
//   });

function init() {
  var myMap = new ymaps.Map(
      "map",
      {
        center: [55.76, 37.64],
        zoom: 10,
      },
      {
        searchControlProvider: "yandex#search",
      }
    ),
    objectManager = new ymaps.ObjectManager({
      // Чтобы метки начали кластеризоваться, выставляем опцию.
      clusterize: true,
      // ObjectManager принимает те же опции, что и кластеризатор.
      gridSize: 32,
      clusterDisableClickZoom: true,
    });

  // Чтобы задать опции одиночным объектам и кластерам,
  // обратимся к дочерним коллекциям ObjectManager.
  objectManager.objects.options.set("preset", "islands#greenDotIcon");
  objectManager.clusters.options.set("preset", "islands#greenClusterIcons");
  myMap.geoObjects.add(objectManager);

  // objectManager.add([
  //   {
  //     id: 0,
  //     geometry: {
  //       type: "Point", coordinates: [55.831903, 37.411961]
  //     },
  //     properties: {
  //       balloonContentHeader:
  //         "хуй в говне",
  //     },
  //   },
  // ]);
  // $.ajax({
  //     url: "js/data.json"
  // }).done(function(data) {
  //     objectManager.add(data);
  // });

  fetch("/points")
    .then((data) => data.json())
    .then((data) => {
      objectManager.add(
        [
            {
              id: 0,
              geometry: {
                type: "Point", coordinates: [data.coordslat,data.coordslon]
              },
              properties: {
                balloonContentHeader:
                  `${data.text}`,
              },
            },
          ]
      );
    });
}
