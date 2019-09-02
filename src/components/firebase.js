import React from "react";
import firebase from "firebase";
import config from "../config/config";

class Firebase extends React.Component {
  constructor() {
    super();

    // if (!firebase.apps.length) {
    //   this.app = firebase.initializeApp(config);
    // } else {
    //   this.app = firebase.app();
    // }
    // this.database = this.app.database();

    this.state = {
      setpath: "/set",
      setText: "",
      readonce: {},
      readon: {}
    };
  }

  setData = (path, data) => {
    this.database.ref(path).set(data);
    console.log("save");
  };

  updateData = (path, data) => {
    this.database.ref(path).update(data);
    console.log("updated");
  };

  pushData = (path, data) => {
    this.database.ref(path).push(data);
    console.log("push :[", data, "] to database");
  };

  multiPush = path => {
    for (let i = 1; i < 10; i++) {
      const data = `push${i}`;
      this.database.ref(path).push(data);
    }
    console.log("multiPush to database");
  };

  objectPush = path => {
    const data = {
      student: {
        name: "Tom",
        age: 33
      },
      school: "NIU"
    };

    let newKey = "";

    return new Promise(resolve => {
      resolve(this.database.ref(path).push());
    })
      .then(newRef => {
        newKey = newRef.key;
        return newRef.set(data);
      })
      .then(() => newKey);
  };

  readData = path => {
      firebase.database().ref(path).once("value", snapshot => {
      const data = snapshot.val();
      console.log("資料庫中的檔案", data);

      this.setState({ readonce: data });
    });
  };

  readDataOn = path => {
    firebase.database().ref(path).on("value", snapshot => {
      const data = snapshot.val();
      console.log("資料庫中的檔案", data);

      this.setState({ readon: data });
    });
  };

  setTextChange = e => {
    const data = e.target.value;
    this.setState({ setText: data });
  };

  render() {
    const setPath = "/set";
    const setText = { data1: "data1" };
    const updateData = { data1: "update" };
    const pushPath = "/push";
    const pushText = "pushdata";
    const readPath = "/data";
    const { readonce, readon } = this.state;
    return (
      <div>
        <h1>Firebase Example</h1>
        <div>
          <h3>Set</h3>
          <button type="button" onClick={() => this.setData(setPath, setText)}>
            Set button
          </button>
        </div>
        <div>
          <h3>Update</h3>
          <button
            type="button"
            onClick={() => this.updateData(setPath, updateData)}
          >
            Update button
          </button>
        </div>
        <div>
          <h3>Push</h3>
          <button
            type="button"
            onClick={() => this.pushData(pushPath, pushText)}
          >
            Push Button
          </button>
          <button type="button" onClick={() => this.multiPush(pushPath)}>
            Multi Push Button
          </button>
          <button type="button" onClick={() => this.objectPush(pushPath)}>
            Push Object Button
          </button>
        </div>
        <div>
          <div>
            <h3>Read</h3>
            <div>
              <button onClick={() => this.readData(readPath)}>
                Read (once)
              </button>
            </div>
            <div>
              <p>讀取到的檔案:</p>
              <p>{JSON.stringify(readonce)}</p>
            </div>
          </div>
          <div>
            <div>
              <button onClick={() => this.readDataOn(readPath)}>
                Read (on)
              </button>
            </div>
            <div>
              <p>讀取到的檔案:</p>
              <p>{JSON.stringify(readon)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Firebase;
