var Versor = {};

// [l, p, g]

function fromAngles(l, p, g) {
    l *= Math.PI / 360;
    p *= Math.PI / 360;
    g *= Math.PI / 360;

    var sl = Math.sin(l), cl = Math.cos(l);
    var sp = Math.sin(p), cp = Math.cos(p);
    var sg = Math.sin(g), cg = Math.cos(g);

    return [
        cl * cp * cg + sl * sp * sg,
        sl * cp * cg - cl * sp * sg,
        cl * sp * cg + sl * cp * sg,
        cl * cp * sg - sl * sp * cg
    ];
}

// [a, b, c, d]
function toAngles(param) {
    var a = param[0],
        b = param[1],
        c = param[2],
        d = param[3];

    return [
        Math.atan2(2 * (a * b + c * d), 1 - 2 * (b * b + c * c)) * 180 / Math.PI,
        Math.asin(Math.max(-1, Math.min(1, 2 * (a * c - d * b)))) * 180 / Math.PI,
        Math.atan2(2 * (a * d + b * c), 1 - 2 * (c * c + d * d)) * 180 / Math.PI
    ];
}

// [a1, b1, c1, d1], [a2, b2, c2, d2]

function interpolateLinear(a1, b1, c1, d1, a2, b2, c2, d2) {
    a2 -= a1, b2 -= b1, c2 -= c1, d2 -= d1;
    var x = new Array(4);

    // return t => {
    //     const l = Math.hypot(x[0] = a1 + a2 * t, x[1] = b1 + b2 * t, x[2] = c1 + c2 * t, x[3] = d1 + d2 * t);
    //     x[0] /= l, x[1] /= l, x[2] /= l, x[3] /= l;
    //     return x;
    // }

    return function(t) {
        var l = Math.hypot(x[0] = a1 + a2 * t, x[1] = b1 + b2 * t, x[2] = c1 + c2 * t, x[3] = d1 + d2 * t);
        x[0] /= l, x[1] /= l, x[2] /= l, x[3] /= l;

        return x;
    }
}

// [a1, b1, c1, d1], [a2, b2, c2, d2]
function interpolate(first, second) {
    var a1 = first[0],
        b1 = first[1],
        c1 = first[2],
        d1 = first[3],
        a2 = second[0],
        b2 = second[1],
        c2 = second[2],
        d2 = second[3];

    var dot = a1 * a2 + b1 * b2 + c1 * c2 + d1 * d2;
    if (dot < 0) a2 = -a2, b2 = -b2, c2 = -c2, d2 = -d2, dot = -dot;

    if (dot > 0.9995)
        return interpolateLinear(a1, b1, c1, d1, a2, b2, c2, d2);

    var theta0 = Math.acos(Math.max(-1, Math.min(1, dot)));
    var x = new Array(4);
    var l = Math.hypot(a2 -= a1 * dot, b2 -= b1 * dot, c2 -= c1 * dot, d2 -= d1 * dot);

    a2 /= l, b2 /= l, c2 /= l, d2 /= l;

    // return t => {
    //     var theta = theta0 * t;
    //     var s = Math.sin(theta);
    //     var c = Math.cos(theta);
    //
    //     x[0] = a1 * c + a2 * s;
    //     x[1] = b1 * c + b2 * s;
    //     x[2] = c1 * c + c2 * s;
    //     x[3] = d1 * c + d2 * s;
    //
    //     return x;
    // }

    return function(t)  {
        var theta = theta0 * t;
        var s = Math.sin(theta);
        var c = Math.cos(theta);

        x[0] = a1 * c + a2 * s;
        x[1] = b1 * c + b2 * s;
        x[2] = c1 * c + c2 * s;
        x[3] = d1 * c + d2 * s;

        return x;
    }
}

function interpolateAngles(a, b) {
    var i = interpolate(fromAngles(a[0], a[1], a[2]), fromAngles(b[0], b[1], b[2]));

   // return t => Versor.toAngles(i(t));

    return function(t) {
        return toAngles(i(t));
    }
}
