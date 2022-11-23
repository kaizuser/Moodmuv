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
interface teacherDTO{
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
let genericTeacher:teacherDTO;

describe('Test suite for teachers', function () {

	//SETTING GENERIC ACTIVITY FOR THE FOLLOWING PROCESS
	describe('Set teacher', function() {
		this.timeout(5000)

		it('Should create a teacher', function (done){
			let teacherData:teacherDTO = {
				email:'test@gmail.com',
				pass:'Flamigera1',
				from:'Google',
			} 

			request(App).post('/api/teacher')
			.send(teacherData)
			.end(function (req, res) {
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				genericTeacher = res.body.data
				done()
			})
		})

		it('Should return error - (lack of data)', function (done){
			let teacherData = {
				name:'noData'
			}

			request(App).post('/api/teacher')
			.send(teacherData)
			.end(function (req, res) {
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})
		})
	})

	describe('Modify teacher', function(){
		it('Should modify a teacher', function(done) {
			let teacherData = {
				id:genericTeacher._id,
				name:'Modified'
			}

			request(App).put(`/api/teacher`)
			.send(teacherData)
			.end(function(req, res){
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				done()
			})
		})

		it('Should return error - (wrong data/id)', function(done){
			let teacherData = {
				id:genericTeacher._id + '0',
				noData:'noData'
			}

			request(App).put(`/api/teacher`)
			.send(teacherData)
			.end(function(req, res){
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})
		})
	})

	describe('Get teachers', function() {
		this.timeout(5000)
		it('Checks response for get teachers - (list of teachers)', function(done) {
			request(App).get('/api/teacher')
			.end(function (req, res) {
				res.should.have.status(200)
				res.body.data.should.be.a('array')
				done()
			})
		})
	})

	describe('Get teacher', function(){
		this.timeout(5000)

		it('Should get one teacher', function(done){
			request(App).get(`/api/teacher/${genericTeacher._id}`)
			.end(function(req, res) {
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				done()
			})
		})

		it('Should return error - (wrong id)', function (done) {
			request(App).get(`/api/teacher/${genericTeacher}0`)
			.end(function(req, res) {
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})
		})
	})

	describe('Delete teacher', function(){
		it('Should delete a teacher', function(done){
			request(App).delete(`/api/teacher/${genericTeacher._id}`)
			.end(function(req, res){
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				done()
			})
		})

		it('Should return an error - (wrong id)', function(done){
			request(App).delete(`/api/teacher/${genericTeacher}0`)
			.end(function(req, res){
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})
		})
	})
})


