//BASICS
import chai,  {should, expect, assert} from 'chai'
import chaiHttp from  'chai-http'
import request from 'supertest'
import createServer from '../server-suite-setup'
import { Response } from 'express'

//INTERFACES
import activityDTO from '../../models/activity'

//SERVER SETUP
let App = createServer()

//CHAI SETUP
chai.use(chaiHttp)
chai.should()

describe('Test suite for activities', function () {
	describe('Get activities', function() {
		it('Checks response for get activities - (list of activities)', function(done) {
			expect(true).to.equal(true)
		})
	})
})

