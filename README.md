# Redux Saga 讀取API簡易範例

## [Demo](https://codesandbox.io/s/github/React-Learing/saga-get-API-data)

![](https://i.imgur.com/KuS6Mtt.png)

繼上次使用Redux-Saga來執行非同步的加減後，我們開始來試著使用Saga的最主要的功能-讀取伺服器的API資料。我們要讀取的api [目標](https://api.github.com/)

[進階React Redux範例-使用Saga達成非同步](https://medium.com/tomsnote/進階react-redux範例-使用saga達成非同步-e044342823ed)

## Saga

既然是要寫saga，那我們就先從saga文件開始寫吧！要讀取API的Saga文件寫法大致如下。

```js
import { call, put } from 'redux-saga/effects';
import { .....  } from '../actions/index';
//要執行的action
export function* readAPI() {
  try {
     //開始要執行的動作
    yield put( //讀取中發起的action );
    const data = yield call(() => fetch(//API網址)
      .then((res) => res.json()));
    yield put(//成功後將data丟入action);
  } catch (error) {
    //失敗後要執行的action;
  }
}
```

這邊從saga引入call和put的方法，call可以讓你調用函數使用，put則是可以發起action。也就是在某些階段發起某些動作改變狀態。

在這邊讀取資料的話會有三種狀態：

- 讀取中
- 讀取成功
- 讀取失敗

讀取中就是當和伺服器發出請求等資料回傳的時候，在這個時候我們要在畫面顯示loading..的狀態，讓使用者知道現在正在讀取。讀取成功，就將得到的資料解析完成後透過action傳到reducer最後傳到畫面上。那如果失敗的話，也可以回傳個狀態告訴使用者讀取失敗了。

**讀取中**：

發起正在request的action，將這個action函數放到put()裡面去啟用他。在發起讀取的request的時候，接著使用call()使用fetch去獲取api的位置。

```js
yield put(readRequest());
const data = yield call(() => fetch('https://api.github.com/')
        								.then((res) => res.json()));

```

**讀取成功**：

待檔案fetch讀取成功後使用put()把得到的data傳出去 （傳到action)

```js
    yield put(readSucces(data));
```

**讀取失敗:**

catch裡面裡面會捕捉到如果獲取失敗的話要執行的動作，當然也可以寫一個action去執行對應的動作。

```js
catch (error) {
    console.log('read error Ribbt');
  }
```

**連結Saga**

在Saga文件夾裡面的index將寫好的saga檔案連結起來，使用takeEvery的發法監聽發起的**'READ_API'**，當發起這個action，就啟動讀取API的Saga。

```js
import { takeEvery } from 'redux-saga/effects';
import readAPI from './readAPI';
...
export default function* rootSaga() {
	...
  yield takeEvery('READ_API', readAPI);
}
```

Saga完整的code:

```js
import { call, put } from 'redux-saga/effects';
import { readSucces, readRequest } from '../actions/index';

export function* readAPI() {
  try {
    yield put(readRequest());
    const data = yield call(() => fetch('https://api.github.com/')
      .then((res) => res.json()));
    yield put(readSucces(data));
  } catch (error) {
    console.log('read error Ribbt');
  }
}
```

## Actions

在saga裡面，我們做了三種狀態要來發起actions，那我們是不是也該來寫對應的actions了呢？不過讀取失敗這個狀態在前面我用印出在console.log()來告知使用者讀取失敗，雖然使用者應該看不到啦XD。

除了和讀取相關的action以外，也需要寫一個按按鈕發起讀取API的actions

>1. 讀取中：readRequest()
>2. 讀取成功：readSucces()
>3. 發起讀取API動作: readAPI()

```js
...
export const READ_API = 'READ_API';
export const READ_SUCCES = 'READ_SUCCES';
export const READ_REQUEST = 'READ_REQUEST';
...

export function readAPI() {
  return {
    type: READ_API,
  };
}

export function readSucces(data) {
  return {
    type: READ_SUCCES,
    payload: data,
  };
}

export function readRequest() {
  return {
    type: READ_REQUEST,
  };
}
```

在讀取成功的Action ( readSucces() )，把從saga讀到的資料傳入。接著可以藉由這個地方傳到reducer。

## Reducer

在reducer這個部分，需要根據不同的action來改變不同的狀態。先設定初始狀態，loading狀態一開始是false，表示並沒有在載入。

```js
const initialState = {
  isLoading: false,
  data: '尚未載入網頁',
};
```

再來是讀取中的狀態，發起讀取的request就是讀起中，修改狀態isloading為true，表示正在讀取中。

```js
case READ_REQUEST:
      return {
        ...state,
        isLoading: true,};
```

接著是讀取成功，讀取成功後，isloading修改為false，並把action讀到的data丟進去state的data裡面。

```js
 case READ_SUCCES:
      const data = action.payload;
      return {
        ...state,
        isLoading: false,
        data,};
```

## Container

接著使用container取得讀取完成的檔案並把它傳入元件裡面，因為檔案的都被存到redux的store裡面，所以只要叫state裡面的資料就能看到reducer取得的檔案了。

```js
export default connect(
  (state) => ({ value: state.counter, read: state.read }),
  ActionCreators
)(Counter);
```

## Components

首先從container引入啟動呼叫api的action (readAPI() )還有要讀取的資料與loading狀態 (read)

```js
   const {readAPI, read} = this.props;
```

最後來把畫面啟動API的按鈕寫上去，按下的時候，呼叫actions傳入的readAPI()的函數啟動呼叫API的action type。

```html
<button type="button" onClick={readAPI}>
    Read API
</button>
```

畫面根據不同狀態顯示，如果loading狀態是true的話，就顯示'Loading...'表示正在載入，如果是false就顯示資料。

```js
{ read.isLoading ? 'Loading...' : JSON.stringify(read.data)}
```

------

到這邊就完成了，可以試著按下畫面上的讀取API的按鈕，接著會顯示loading的字樣表示在獲取資料，待資料獲取後，就會換成顯示得的的資料了。

## 資料流向

按下畫面的按鈕後，會啟動readAPI()的函數並啟動READ_API的action type，接著因為saga監聽到這個action type並啟動讀起功能的saga。

在saga裡面我們先設定了讓資料表示正在loading的狀態，接著讀取到資料後，將資料丟到action裡面。

接著reducer跟著讀取成功的action type (READ_SUCCES) 將資料透過store後經由讀取state傳到conatiner，在傳到components裡面去改變畫面。

整個過程看文字會看得滿複雜的，我們畫一張流程整理圖，建議可以對著看，或是之後複習的時候可以更快想起來。

![saga ftech api](https://i.imgur.com/8VBrXIp.jpg)

