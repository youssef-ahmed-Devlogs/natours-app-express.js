const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'error',
      message: 'Body data are not valid!',
    });
  }

  next();
};

exports.checkID = (req, res, next, val) => {
  const id = val * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  let tour = req.body;
  tours.push(tour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);

  const newTour = Object.assign(tour, req.body);
  res.status(200).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};

exports.deleteTour = (req, res) => {
  return res.status(204).json({
    status: 'success',
    data: null,
  });
};
