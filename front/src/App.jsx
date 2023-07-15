import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

export default function App() {
  const [topR, setTopR] = useState();
  const [l, setL] = useState();
  useEffect(() => {
    axios("http://localhost:8080/loc", {
      method: "get",
    }).then((v) => {
      // console.log(v.data)
      setL(v.data);
    });

    axios("http://localhost:8080/loc/top", {
      method: "get",
    }).then((v) => {
      console.log(v.data);
      setTopR(v.data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="container mt-4">
                <ActionButton />
                <h5 className="mt-3 mt-md-0">Locations, You must visit 😊</h5>
                <div className="container d-flex flex-sm-column flex-md-row flex-wrap gap-3 mt-4 align-content-sm-center align-content-md-start">
                  {!!topR ? (
                    topR.map((v, i) => {
                      const { name, description, date, ratings, address, _id } =
                        v;
                      return (
                        <Card
                          key={i}
                          name={name}
                          description={description}
                          date={date}
                          ratings={ratings}
                          address={address}
                          id={_id}
                        />
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
                <h5 className="mt-5">All Locations</h5>
                <div className="container d-flex flex-sm-column flex-md-row flex-wrap gap-3 mt-4 align-content-sm-center align-content-md-start">
                  {!!l ? (
                    l.map((v, i) => {
                      const { name, description, date, ratings, address, _id } =
                        v;
                      return (
                        <Card
                          key={i}
                          name={name}
                          description={description}
                          date={date}
                          ratings={ratings}
                          address={address}
                          id={_id}
                        />
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* modal for input new location */}
              <div
                className="modal fade"
                id="addLocationModal"
                tabIndex={-1}
                aria-labelledby="addLocationModal"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Add new location
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body px-sm-3 py-sm-1 px-md-5 py-md-3">
                      <NewLocationForm />
                    </div>
                  </div>
                </div>
              </div>

              {/* modal for search  */}
              <div
                className="modal fade"
                id="searchModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Search your destination ✈
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body px-3 py-4">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Enter Search Query
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        ></Route>
        <Route path=":id" element={<Component1 />} />
      </Routes>
    </div>
  );
}

function Component1() {
  const p = useParams();
  useEffect(() => {
    axios("http://localhost:8080/loc", {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        q: p.id,
      },
    }).then((v) => {
      console.log(v.data);
    });
  }, []);

  console.log("Im executed", p);
  return (
    <div className="container">
      <h2>
        Search Results for <i className="fw-light">'{p.id}'</i>
      </h2>
    </div>
  );
}

function ActionButton() {
  return (
    <div className="container d-flex justify-content-end gap-2">
      <button
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#addLocationModal"
      >
        <i className="bi bi-node-plus"></i> Location
      </button>
      <button
        className="btn btn-info"
        data-bs-toggle="modal"
        data-bs-target="#searchModal"
      >
        <i className="bi bi-search"></i> Locations
      </button>
    </div>
  );
}

function NewLocationForm() {
  const formRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formRef.current.name.value);
    console.log(formRef.current.address.value);
    console.log(formRef.current.desc.value);
    console.log(formRef.current.ratings.value);
    axios("http://localhost:8080/loc/new", {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        name: formRef.current.name.value,
        address: formRef.current.address.value,
        description: formRef.current.desc.value,
        ratings: formRef.current.ratings.value,
        date: Date.now(),
      },
    });
    window.location.reload(false);
  }
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Enter Name
        </label>
        <input type="text" className="form-control" id="name" />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Enter Address
        </label>
        <input type="text" className="form-control" id="address" />
      </div>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">
          Enter Description
        </label>
        <input type="text" className="form-control" id="desc" />
      </div>
      <div className="mb-3">
        <label htmlFor="ratings" className="form-label">
          Enter Ratings
        </label>
        <input
          type="number"
          className="form-control"
          id="ratings"
          min={0}
          max={5}
          step={0.1}
        />
      </div>
      <div className="d-flex mt-4">
        <button className="btn btn-success ms-auto" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

function Card({ name, address, description, date, ratings, id }) {
  const formRef = useRef();
  function handleDeleteLocation(id) {
    console.log(`im clicked ${id}`);
    axios(`http://localhost:8080/loc/${id}`, {
      method: "Delete",
    });
    window.location.reload(false);
  }
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{!!name ? name : "Dynamic Island"}</h5>
        <div className="d-flex gap-3">
          <h6 className="card-subtitle mb-2 text-muted fs-6 fw-normal">
            {!!date
              ? `${new Date(date).getHours()}:${
                  new Date(date).getMinutes() + 1
                }`
              : ""}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted fs-6 fw-normal">
            {!!date
              ? `${new Date(date).getDate()}/${
                  new Date(date).getMonth() + 1
                }/${new Date(date).getFullYear()}`
              : ""}
          </h6>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">
          {!!ratings ? `${ratings}/5` : "4.3 / 5"}{" "}
          <i className="bi bi-star-fill text-warning"></i>
        </h6>
        <p className="card-text text-truncate">
          {!!description
            ? description
            : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. At perferendis sunt corrupti dolores reprehenderit doloribus"}
        </p>
        <div className="btn-group">
          <button
            className="btn btn-info btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#updateModal"
          >
            <i className="bi bi-window-stack"></i> Update
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              // console.log('im here')
              // console.log(id)
              handleDeleteLocation(id);
            }}
          >
            <i className="bi bi-trash3"></i> Delete
          </button>
        </div>
      </div>
      <div
        className="modal fade"
        id="updateModal"
        tabIndex={"-1"}
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update, {name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(formRef.current.name.value);
                console.log(formRef.current.address.value);
                console.log(formRef.current.desc.value);
                console.log(formRef.current.ratings.value);
                axios(`http://localhost:8080/loc/${id}`, {
                  method: "patch",
                  headers: {
                    "content-type": "application/x-www-form-urlencoded",
                  },
                  data: {
                    id: id,
                    name: formRef.current.name.value,
                    address: formRef.current.address.value,
                    description: formRef.current.desc.value,
                    ratings: formRef.current.ratings.value,
                  },
                });
                window.location.reload(false);
              }}
              ref={formRef}
            >
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Enter Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Enter Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    defaultValue={address}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Enter Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="desc"
                    defaultValue={description}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ratings" className="form-label">
                    Enter Ratings
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="ratings"
                    min={0}
                    max={5}
                    step={0.1}
                    defaultValue={ratings}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" type="submit">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  let navigate = useNavigate();
  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <span
          className="navbar-brand mb-0 h1 text-info ms-4"
          onClick={() => {
            navigate("/");
          }}
        >
          Travera
        </span>
      </div>
    </nav>
  );
}
