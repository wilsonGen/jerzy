var vector = require('./vector');
var distributions = require('./distributions');

var Nonparametric = function() {};

/*
 * Two-sample Kolmogorov-Smirnov test
 */

Nonparametric.kolmogorovSmirnov = function(x, y, doubleTheD = false) {
	var all = new vector.Vector(x.elements.concat(y.elements)).sort();
	var ecdfx = x.ecdf(all);
	var ecdfy = y.ecdf(all);
	var d = ecdfy.subtract(ecdfx).abs().max();
	if (doubleTheD) d = Math.min((d * 2), 1)
	var n = (x.length() * y.length()) / (x.length() + y.length());
	var ks = Math.sqrt(n) * d;
	var p = 1 - new distributions.Kolmogorov().distr(ks);

	return {
		"d": d,
		"ks": ks,
		"p": p
	};
}

module.exports.Nonparametric = Nonparametric;
