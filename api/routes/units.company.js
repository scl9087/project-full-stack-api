const router = require('express').Router({ mergeParams: true });
const Units = require('../models/units')
const Company = require('../models/company')

// GET ALL
router.get('/', async (req, res, next) => {
  const status = 200
  const {company} = await Units.findById(req.params.unitId).select('company')
  
  res.json({ status, company })
})

// UPDATE
router.patch('/', async (req, res, next) => {
  const status = 200
  const unit = await Units.findById(req.params.unitId)
  const company = unit.company
  
  Object.assign(company, req.body)
  await unit.save()
  
  res.status(status).json({ status, company });
})

// DELETE
router.delete('/', async (req, res, next) => {
  const status = 200
  const unit = await Units.findById(req.params.unitId)
  const company =  unit.company.remove()
  await unit.save()

  res.status(status).json({ status, company });
})

module.exports = router