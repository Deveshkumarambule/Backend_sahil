//Require the dev-dependencies
const sinon = require("sinon");
let mongoose = require("mongoose");
// const { User } = require("../ticket_database");

const { UserModel } = require("../ticket_database");
let chai = require("chai");
let chaiHttp = require("chai-http");
let { faker } = require("@faker-js/faker");
let server = require("../user_management");
// let server = "http://localhost:7001";

let should = chai.should();
chai.use(chaiHttp);
// get all user list
describe("GET ALL USER LIST", () => {
  beforeEach(() => {
    sinon.restore();
  });
  it("It should Get All User", (done) => {
    chai
      .request(server)
      .get("/user_management/alluserlist")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Object");
        res.body.should.not.a("array");
        res.body.should.not.equal(0);
        // should.not.exist(err);
        // should.exist(res);
        done();
      });
  });
  it("It Should Not Get All User", (done) => {
    chai
      .request(server)
      .get("/user_management/alluserlists")
      .end((err, res) => {
        res.should.have.status(404);
        should.exist("errors");
        done();
      });
  });
});

// add user
describe("ADD NEW USER", () => {
  it("It should Add New User", (done) => {
    let User = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      mobile_number: faker.phone.number("9#########"),
      email: faker.internet.email(),
      password: "Sahil@123",
      emp_id: faker.random.numeric(5),
      role: "User",
    };
    chai
      .request(server)
      .post("/user_management/adduser")
      // .send(User)
      .end((err, res) => {
        // console.log("-------------", res);
        res.should.have.status(200);
        res.body.should.be.a("Object");
        res.body.should.not.a("array");
        res.body.should.not.equal(0);
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });
  it("It should Have All Property", (done) => {
    let User = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      mobile_number: faker.phone.number("9#########"),
      email: faker.internet.email(),
      password: "Sahil@123",
      emp_id: faker.random.numeric(5),
      role: "User",
    };
    // const id = faker.database.mongodbObjectId();
    // sinon.stub(UserModel, "save").returns({
    //   // _id: id,
    //   first_name: faker.name.firstName(),
    //   last_name: faker.name.lastName(),
    //   mobile_number: faker.phone.number("9#########"),
    //   email: faker.internet.email(),
    //   password: "Sahil@123",
    //   emp_id: faker.random.numeric(5),
    //   role: "User",
    // });
    chai
      .request(server)
      .post("/user_management/adduser")
      .send(User)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Object");
        res.body.should.not.a("array");
        res.body.user.should.have.property("first_name");
        res.body.user.should.have.property("last_name");
        res.body.user.should.have.property("email");
        res.body.user.should.have.property("mobile_number");
        res.body.user.should.have.property("password");
        res.body.user.should.have.property("emp_id");
        res.body.user.should.have.property("role");
        res.body.should.have.property("message").eql("User Added Successfully");
        done();
      });
  });
  it("It Should Not Get All User", (done) => {
    chai
      .request(server)
      .post("/user_management/addusera")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it("It Should Not Get All User", (done) => {
    let User = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      mobile_number: faker.phone.number("9#########"),
      email: faker.internet.email(),
      password: "Sahil@123",
      emp_id: faker.random.numeric(5),
      role: "",
    };
    chai
      .request(server)
      .post("/user_management/adduser")
      .send(User)
      .end((err, res) => {
        // console.log(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
        should.exist(err);
        res.body.should.have.property("role");
        // .eql("Role is a required field");

        done();
      });
  });
});
describe("/GET SPECIFIC USER", () => {
  beforeEach(() => {
    sinon.restore();
  });
  it("it should GET A USER by the given id", (done) => {
    const id = faker.database.mongodbObjectId();
    sinon.stub(UserModel, "findOne").returns({
      _id: id,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      mobile_number: faker.phone.number("9#########"),
      email: faker.internet.email(),
      password: "Sahil@123",
      emp_id: faker.random.numeric(5),
      role: "User",
    });

    // getUser.save((err, getUser) => {
    chai
      .request(server)
      .get("/user_management/getspecificuser/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("Object");
        res.body.should.have.property("message").eql("User Found Successfully");
        should.not.exist(err);
        res.body.user_data.should.have.property("_id").eql(id);
        res.body.user_data.should.have.property("first_name");
        res.body.user_data.should.have.property("last_name");
        res.body.user_data.should.have.property("mobile_number");
        res.body.user_data.should.have.property("email");
        res.body.user_data.should.have.property("emp_id");
        res.body.user_data.should.have.property("role");
        done();
        // });
      });
  });
  it("it should Not GET A USER by the given id", (done) => {
    beforeEach(() => {
      sinon.restore();
    });
    const id = faker.database.mongodbObjectId() + "hjh";
    sinon.stub(UserModel, "findOne").returns(null);
    chai
      .request(server)
      .get("/user_management/getspecificuser/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Please Provide Valid Id,Id should be 24 characters");
        res.body.should.have.property("status").eql(false);
        done();
      });
  });
});
describe("EDIT USER BY ID", () => {
  it("it should EDIT a USER by given  id", (done) => {
    const id = faker.database.mongodbObjectId();
    sinon.stub(UserModel, "findByIdAndUpdate").returns({
      _id: id,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      mobile_number: faker.phone.number("9#########"),
      email: faker.internet.email(),
      password: "Sahil@123",
      emp_id: faker.random.numeric(5),
      role: "User",
    });
    // book.save((err, book) => {
    chai
      .request(server)
      .patch("/user_management/edituser/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("User Edited Successfully");
        should.not.exist(err);
        res.body.edited_Data.should.have.property("_id").eql(id);
        res.body.edited_Data.should.have.property("first_name");
        res.body.edited_Data.should.have.property("last_name");
        res.body.edited_Data.should.have.property("mobile_number");
        res.body.edited_Data.should.have.property("email");
        res.body.edited_Data.should.have.property("emp_id");
        res.body.edited_Data.should.have.property("role");
        done();
      });
  });
  it("it should not EDIT a USER by given  id", (done) => {
    const id = faker.database.mongodbObjectId() + "gff";
    sinon.stub(UserModel, "findByIdAndUpdate").returns(null);
    chai
      .request(server)
      .patch("/user_management/edituser/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Please Provide Correct Id Data Not Found With This ID");

        done();
      });
  });
});
