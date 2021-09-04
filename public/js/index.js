ymaps.ready(init);
// const Point
let coord = [];
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
  var myPlacemark,
      myMap = new ymaps.Map('map', {
          center: [55.753994, 37.622093],
          zoom: 12
      },
      objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true,
      }), {
          searchControlProvider: 'yandex#search'
      });

  // Слушаем клик на карте.
  myMap.events.add('click', function (e) {
    var coords = e.get('coords');
    console.log(coords);
    
      // Если метка уже создана – просто передвигаем ее.
      if (myPlacemark) {
          myPlacemark.geometry.setCoordinates(coords);
      }
      // Если нет – создаем.
      else {
          myPlacemark = createPlacemark(coords);
          myMap.geoObjects.add(myPlacemark);
          // Слушаем событие окончания перетаскивания на метке.
          myPlacemark.events.add('dragend', function () {
              getAddress(myPlacemark.geometry.getCoordinates());
          });
      }
    // getAddress(coords);
    // objectManager.objects.options.set("preset", "islands#greenDotIcon");
    // objectManager.clusters.options.set("preset", "islands#greenClusterIcons");
    // myMap.geoObjects.add(objectManager);
  });

  // Создание метки.
  function createPlacemark(coords) {
      return new ymaps.Placemark(coords, {
          iconCaption: 'поиск...'
      }, {
          preset: 'islands#violetDotIconWithCaption',
          draggable: true
      });
  }

  // Определяем адрес по координатам (обратное геокодирование).
  function getAddress(coords) {
      myPlacemark.properties.set('iconCaption', 'поиск...');
      ymaps.geocode(coords).then(function (res) {
          var firstGeoObject = res.geoObjects.get(0);

          myPlacemark.properties
              .set({
                  // Формируем строку с данными об объекте.
                  iconCaption: [
                      // Название населенного пункта или вышестоящее административно-территориальное образование.
                      firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                      // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                      firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                  ].filter(Boolean).join(', '),
                  // В качестве контента балуна задаем строку с адресом объекта.
                  balloonContent: firstGeoObject.getAddressLine()
              });
      });
  }

  const createForm = document.querySelector('#createForm');

createForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  formData.coord = coord;
  const response = await fetch('/user/createPoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(formData)
  });
  if (response.ok) {
    window.location.href = 'http://localhost:3000';
  } 
});

  
  myMap.events.add('click', async function (e) {
    coord = await e.get('coords');
    console.log(coord);

    
    // const formData = coords;



    // const response = await fetch('/user/createPoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: JSON.stringify({coords})
    // });
    // if (response.ok) {
    //   window.location.href = 'http://localhost:3000';
    // } 

  });


  objectManager.objects.options.set("preset", "islands#greenDotIcon");
  objectManager.clusters.options.set("preset", "islands#greenClusterIcons");
  myMap.geoObjects.add(objectManager);
  fetch("/points")
  .then((data) => data.json())
  .then((data) => {
    for (let point of data) {
      objectManager.add(
        [
            {
              id: point.id,
              geometry: {
                type: "Point", coordinates: [point.coordslat, point.coordslon]
            },
              properties: {
                balloonContentHeader:
                  `${point.text}, <br><br> добавил ${point.user}`,
                balloonContentBody: `${point.havetopay} <br><br> Оценка: ${point.rate} <br><br>
                <form class="event__stats-loc" method="post" action='/points/${point.id}/like'>
                <button class="event__stats nobtn">
                <img src="../img/svg/like.svg" alt="" class="event__icon">
                <p class="event__text">${point.likes}</p>
                </button>
                </form>`, 
              },
          },
        
          ]
      );
    }

  });
  // Чтобы задать опции одиночным объектам и кластерам,
  // обратимся к дочерним коллекциям ObjectManager.

}
///тут будет поиск
// const indexForm = document.querySelector('#search');

// if(indexForm) {
//   indexForm.addEventListener('click', async (e) => {
//     e.preventDefault();
//     // const eventsWrapper = document.querySelector('#events');
  
//     const textSelect = document.querySelector('#textSelect');
//     const postid = textSelect.value;
    
//     const userSelect = document.querySelector('#userSelect');
//     const userid = userSelect.value;
//     if(e.target.tagName === 'BUTTON') {
//       const response = await fetch('/search', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json;charset=utf-8' },
//         body: JSON.stringify({ postid, userid }),
//       });
//       if(response.ok) {
//         const findPoints = await response.json();
//         console.log(findPoints);
        
//         // eventsWrapper.innerHTML = createEvents(findPosts);
//       }
//     }
//   })
//   }
