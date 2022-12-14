//BASICS
import chai,  {should, expect, assert} from 'chai'
import chaiHttp from  'chai-http'
import request from 'supertest'
import createServer from '../setup/server-suite-setup'

//INTERFACES
interface activityDTO{
	_id?:string
	author:string,
	type:string,
	name:string,
	format:string,
	level:string,
	desc:string,
	disciples: Array<string>,
	duration:string,
}

//SERVER SETUP
let App = createServer()

//CHAI SETUP
chai.use(chaiHttp)
chai.should()

//GENERIC DATA
let genericUserId = '63788a81e53b7917b97733fc'
let genericActivity:activityDTO;

describe('Test suite for activities', function () {

	//SETTING GENERIC ACTIVITY FOR THE FOLLOWING PROCESS
	describe('Set activity', function() {
		this.timeout(5000)

		it('Should create an activity', function (done){
			let activityData:activityDTO = {
				author: genericUserId,
				type:'Event',
				name:'Activity test',
				format:'Virtual',
				level:'Dificil',
				desc:'Test description',
				disciples:['Acroyoga'],
				duration:'20HS',
			} 

			request(App).post('/api/activity')
			.send(activityData)
			.end(function (req, res) {
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				genericActivity = res.body.data
				done()
			})
		})

		it('Should return error - (lack of data)', function (done){
			let activityData = {
				name:'noData'
			}

			request(App).post('/api/activity')
			.send(activityData)
			.end(function (req, res) {
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})
		})
	})

	describe('Modify activity', function(){
		it('Should modify an activity', function(done) {
			let activityData = {
				id:genericActivity._id,
				name:'Modified'
			}

			request(App).put(`/api/activity`)
			.send(activityData)
			.end(function(req, res){
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				done()
			})
		})

		it('Should return error - (wrong data/id)', function(done){
			let activityData = {
				id:genericActivity._id + '0',
				noData:'noData'
			}

			request(App).put(`/api/activity`)
			.send(activityData)
			.end(function(req, res){
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})
		})
	})

	describe('Get activities', function() {
		this.timeout(5000)
		it('Checks response for get activities - (list of activities)', function(done) {
			request(App).get('/api/activity')
			.end(function (req, res) {
				res.should.have.status(200)
				res.body.data.should.be.a('array')
				done()
			})
		})
	})

	describe('Get activity', function(){
		this.timeout(5000)

		it('Should get one activity', function(done){
			request(App).get(`/api/activity/${genericActivity._id}`)
			.end(function(req, res) {
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				done()
			})
		})

		it('Should return error - (wrong id)', function (done) {
			request(App).get(`/api/activity/${genericActivity}0`)
			.end(function(req, res) {
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})
		})
	})

	describe('Delete activity', function(){
		it('Should delete an activity', function(done){
			request(App).delete(`/api/activity/${genericActivity._id}`)
			.end(function(req, res){
				res.should.have.status(200)
				res.body.data.should.be.a('object')
				done()
			})
		})

		it('Should return an error - (wrong id)', function(done){
			request(App).delete(`/api/activity/${genericActivity}0`)
			.end(function(req, res){
				res.should.have.status(200)
				assert.equal(res.body.data, null)
				done()
			})

		})
	})
})


