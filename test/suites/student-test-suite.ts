//BASICS
import chai,  {should, expect, assert} from 'chai'
import chaiHttp from  'chai-http'
import request from 'supertest'
import createServer from '../setup/server-suite-setup'
import mongoose, {Schema} from 'mongoose'
import { Response } from 'express'
import axios from 'axios'
import {log} from 'console'

//INTERFACES
interface studentDTO{
	_id?:string,
	email:string,
	pass:string,
	from:string,
}

//SERVER SETUP
let App = createServer()

//CHAI SETUP
chai.use(chaiHttp)
chai.should()

//GENERIC DATA
let genericTeacher:studentDTO;

describe('Test suite for students', function () {

	//SETTING GENERIC ACTIVITY FOR THE FOLLOWING PROCESS
	describe('Set student', function() {
		this.timeout(5000)

		it('Should create a student', function (done){
			let studentData:studentDTO = {
				email:'test@gmail.com',
				pass:'Flamigera1',
				from:'Google',
			} 

			request(App).post('/api/student')
			.send(studentData)
			.end(function (req, res) {
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				genericTeacher = res.body.data
				done()
			})
		})

		it('Should return error - (lack of data)', function (done){
			let studentData = {
				name:'noData'
			}

			request(App).post('/api/student')
			.send(studentData)
			.end(function (req, res) {
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})
		})
	})

	describe('Modify student', function(){
		it('Should modify a student', function(done) {
			let studentData = {
				id:genericTeacher._id,
				name:'Modified'
			}

			request(App).put(`/api/student`)
			.send(studentData)
			.end(function(req, res){
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				done()
			})
		})

		it('Should return error - (wrong data/id)', function(done){
			let studentData = {
				id:genericTeacher._id + '0',
				noData:'noData'
			}

			request(App).put(`/api/student`)
			.send(studentData)
			.end(function(req, res){
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})
		})
	})

	describe('Get students', function() {
		this.timeout(5000)
		it('Checks response for get students - (list of students)', function(done) {
			request(App).get('/api/student')
			.end(function (req, res) {
				res.should.have.status(200)
				res.body.data.should.be.a('array')
				done()
			})
		})
	})

	describe('Get student', function(){
		this.timeout(5000)

		it('Should get one student', function(done){
			request(App).get(`/api/student/${genericTeacher._id}`)
			.end(function(req, res) {
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				done()
			})
		})

		it('Should return error - (wrong id)', function (done) {
			request(App).get(`/api/student/${genericTeacher}0`)
			.end(function(req, res) {
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})
		})
	})

	describe('Delete student', function(){
		it('Should delete a student', function(done){
			request(App).delete(`/api/student/${genericTeacher._id}`)
			.end(function(req, res){
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				done()
			})
		})

		it('Should return an error - (wrong id)', function(done){
			request(App).delete(`/api/student/${genericTeacher}0`)
			.end(function(req, res){
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})
		})
	})
})


