// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"components/movie-card/movie-card.scss":[function(require,module,exports) {

},{}],"img/star-fill.svg":[function(require,module,exports) {
module.exports = "/star-fill.b645a01b.svg";
},{}],"img/star.svg":[function(require,module,exports) {
module.exports = "/star.647382b2.svg";
},{}],"components/movie-card/movie-card.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieCard = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRouterDom = require("react-router-dom");
var _react = _interopRequireWildcard(require("react"));
require("./movie-card.scss");
var _starFill = _interopRequireDefault(require("../../img/star-fill.svg"));
var _star = _interopRequireDefault(require("../../img/star.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MovieCard = ({
  movie,
  user,
  token,
  setUser,
  showFavoriteButtons
}) => {
  const [isFavorite, setIsFavorite] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    setIsFavorite(user && user.FavoriteMovies && user.FavoriteMovies.includes(movie._id));
  }, [user, movie._id]);
  const addFavoriteMovie = () => {
    if (isFavorite) {
      return;
    }
    fetch(`https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.ok) {
        alert(`${movie.Title} has been added to your favorites!`);
        return response.json();
      } else {
        alert("Favorites was not updated.");
        return;
      }
    }).then(data => {
      if (user) {
        setIsFavorite(true);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
    }).catch(e => {
      alert(e);
    });
  };
  const removeFavoriteMovie = () => {
    if (!isFavorite) {
      return;
    }
    fetch(`https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.ok) {
        alert(`${movie.Title} was removed from your favorites.`);
        return response.json();
      } else {
        alert("Favorites was not updated.");
        return false;
      }
    }).then(data => {
      if (user) {
        setIsFavorite(false);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
    }).catch(e => {
      alert(e);
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "movie-card text-light"
  }, showFavoriteButtons && (isFavorite ? /*#__PURE__*/_react.default.createElement("button", {
    className: "unfavorite-button",
    onClick: removeFavoriteMovie
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _starFill.default,
    alt: "Unfavorite Button"
  })) : /*#__PURE__*/_react.default.createElement("button", {
    className: "favorite-button",
    onClick: addFavoriteMovie
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _star.default,
    alt: "Favorite Button"
  }))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    className: "no-und",
    to: `/movies/${encodeURIComponent(movie._id)}`
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "movie-img",
    src: movie.ImagePath
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, movie.Title))));
};
exports.MovieCard = MovieCard;
MovieCard.propTypes = {
  movie: _propTypes.default.shape({
    Title: _propTypes.default.string.isRequired,
    Description: _propTypes.default.string,
    Genre: _propTypes.default.shape({
      Name: _propTypes.default.string.isRequired,
      Description: _propTypes.default.string
    }),
    Director: _propTypes.default.shape({
      Name: _propTypes.default.string.isRequired,
      Description: _propTypes.default.string
    }),
    Featured: _propTypes.default.string,
    ImagePath: _propTypes.default.string
  }).isRequired
};
},{"./movie-card.scss":"components/movie-card/movie-card.scss","../../img/star-fill.svg":"img/star-fill.svg","../../img/star.svg":"img/star.svg"}],"components/movie-view/movie-view.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _reactRouterDom = require("react-router-dom");
require("./movie-view.scss");
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MovieView = ({
  movies,
  user,
  token,
  setUser,
  setFilteredMovies
}) => {
  const {
    id
  } = (0, _reactRouter.useParams)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [movie, setMovie] = (0, _react.useState)(null);
  const [isFavorite, setIsFavorite] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const foundMovie = movies.find(m => m._id === id);
    setMovie(foundMovie);
    setIsFavorite(user && user.FavoriteMovies && user.FavoriteMovies.includes(id));
  }, [id, movies, user]);
  if (!movie) {
    return /*#__PURE__*/_react.default.createElement("div", null, "Loading...");
  }
  const handleGoBack = () => {
    navigate(-1);
    setFilteredMovies(movies);
  };
  const addFavoriteMovie = () => {
    if (isFavorite) {
      return;
    }
    fetch(`https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.ok) {
        alert(`${movie.Title} has been added to your favorites!`);
        setIsFavorite(true);
        return response.json();
      } else {
        alert("Favorites was not updated.");
        return;
      }
    }).then(data => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
    }).catch(e => {
      alert(e);
    });
  };
  const removeFavoriteMovie = () => {
    if (!isFavorite) {
      return;
    }
    fetch(`https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.ok) {
        alert(`${movie.Title} was removed from your favorites.`);
        setIsFavorite(false);
        return response.json();
      } else {
        alert("Favorites was not updated.");
        return false;
      }
    }).then(data => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
    }).catch(e => {
      alert(e);
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "text-light"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("img", {
    loading: "lazy",
    src: movie.ImageBackdrop,
    alt: "Poster of Movie"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, movie.Title)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h4", null, movie.Description)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", null, "Genre: "), /*#__PURE__*/_react.default.createElement("span", null, movie.Genre.Name)), /*#__PURE__*/_react.default.createElement("div", {
    className: "my-2"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Director: "), /*#__PURE__*/_react.default.createElement("span", null, movie.Director.Name)), /*#__PURE__*/_react.default.createElement("div", null, isFavorite ? /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "warning",
    className: "my-md-auto",
    onClick: removeFavoriteMovie
  }, "Remove from Favorites") : /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "secondary",
    className: "my-md-auto",
    onClick: addFavoriteMovie
  }, "Add to Favorites"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: handleGoBack,
    className: "my-md-auto mx-md-2",
    variant: "secondary"
  }, "Return")));
};
exports.MovieView = MovieView;
},{"./movie-view.scss":"components/movie-card/movie-card.scss"}],"components/login-view/login-view.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
var _reactRouterDom = require("react-router-dom");
require("./login-view.scss");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const LoginView = ({
  onLoggedIn
}) => {
  const [Username, setUsername] = (0, _react.useState)("");
  const [Password, setPassword] = (0, _react.useState)("");
  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      Username: Username,
      Password: Password
    };
    fetch("https://chaseflix-481df0d77a4b.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
        window.location.replace("/movies");
      } else {
        alert("No such user");
      }
    }).catch(error => {
      console.error("Login error:", error);
      alert("An error occurred during login. Please check your credentials and try again.");
    });
  };
  return /*#__PURE__*/_react.default.createElement(_Form.default, {
    className: "text-light my-5",
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formUsername"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Username"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    size: "lg",
    className: "text-light mb-3",
    type: "text",
    value: Username,
    onChange: e => setUsername(e.target.value),
    required: true
  })), /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formPassword"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Password "), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    size: "lg",
    className: "text-light mb-3",
    type: "password",
    value: Password,
    onChange: e => setPassword(e.target.value),
    required: true
  })), /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "me-2 my-2",
    variant: "primary",
    type: "submit"
  }, "Submit"), /*#__PURE__*/_react.default.createElement("div", {
    className: "mx-4 my-4"
  }, /*#__PURE__*/_react.default.createElement("h4", null, "Don't have an account? ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/signup"
  }, "Sign up"))));
};
exports.LoginView = LoginView;
},{"./login-view.scss":"components/movie-card/movie-card.scss"}],"components/signup-view/signup-view.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignupView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
var _reactRouterDom = require("react-router-dom");
require("./signup-view.scss");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SignupView = ({
  user
}) => {
  const [Username, setUsername] = (0, _react.useState)("");
  const [Password, setPassword] = (0, _react.useState)("");
  const [Email, setEmail] = (0, _react.useState)("");
  const [Birthday, setBirthday] = (0, _react.useState)("");
  const [controlPassword, setControlPassword] = (0, _react.useState)("");
  const handleSubmit = event => {
    event.preventDefault();
    if (Password === controlPassword) {
      const data = {
        Username: Username,
        Password: Password,
        Email: Email,
        Birthday: Birthday
      };
      setUsername("");
      setPassword("");
      setControlPassword("");
      setEmail("");
      setBirthday("");
      fetch("https://chaseflix-481df0d77a4b.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (response.ok) {
          alert("Signup successful!");
          window.location.replace("/login");
        } else {
          alert("Signup failed :(");
        }
      }).catch(error => {
        console.error("Error during signup:", error);
      });
    } else {
      alert("Your passwords don't match.");
      return;
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Form.default, {
    className: "text-light mb-5",
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formSignUsername"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Username"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    size: "lg",
    className: "text-light mb-3",
    type: "text",
    value: Username,
    onChange: e => setUsername(e.target.value),
    required: true,
    minLength: "3",
    maxLength: "12"
  })), /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formSignPassword"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Password"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    size: "lg",
    className: "text-light mb-3",
    type: "password",
    value: Password,
    onChange: e => setPassword(e.target.value),
    required: true,
    minLength: "8",
    maxLength: "20"
  })), /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formControlPassword"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Confirm password"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    size: "lg",
    className: "text-light mb-3",
    type: "password",
    value: controlPassword,
    onChange: e => setControlPassword(e.target.value),
    required: true,
    minLength: "8",
    maxLength: "20"
  })), /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formSignEmail"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Email"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    size: "lg",
    className: "text-light mb-3",
    type: "email",
    value: Email,
    onChange: e => setEmail(e.target.value),
    required: true
  })), /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formSignBirthday"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Birthday"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    size: "lg",
    className: "text-light",
    type: "date",
    value: Birthday,
    onChange: e => setBirthday(e.target.value),
    required: true
  })), /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "primary",
    className: "me-2 my-4",
    type: "submit"
  }, "Submit"), /*#__PURE__*/_react.default.createElement("div", {
    className: "mx-4 my-4"
  }, /*#__PURE__*/_react.default.createElement("h3", null, "Already registered? ", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/login"
  }, "Login")))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
    className: " d-flex justify-content-center"
  }, "Note:", /*#__PURE__*/_react.default.createElement("br", null), "We will not use or distribute your email or any of your data.", /*#__PURE__*/_react.default.createElement("br", null), "We will never ask for your password nor do I have access to it.")));
};
exports.SignupView = SignupView;
},{"./signup-view.scss":"components/movie-card/movie-card.scss"}],"components/file-upload-form/file-upload-form.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileUploadForm = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const FileUploadForm = ({
  token,
  onUpload
}) => {
  const [selectedFile, setSelectedFile] = (0, _react.useState)(null);
  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("ProfilePic", selectedFile);
    fetch("https://chaseflix-481df0d77a4b.herokuapp.com/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }).then(response => response.json()).then(data => {
      console.log(data);
      alert("Profile picture uploaded successfully!");
      onUpload(data.fileLocation);
    }).catch(error => {
      console.error("Error uploading file:", error);
      alert("Failed to upload profile picture.");
    });
  };
  return /*#__PURE__*/_react.default.createElement(_Form.default, {
    onSubmit: handleUpload
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Group, null, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Upload Profile Picture"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    type: "file",
    onChange: handleFileChange
  })), /*#__PURE__*/_react.default.createElement(_Button.default, {
    type: "submit"
  }, "Upload"));
};
exports.FileUploadForm = FileUploadForm;
},{}],"components/profile-update/profile-update.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileUpdate = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
require("./profile-update.scss");
var _Modal = _interopRequireDefault(require("react-bootstrap/Modal"));
var _fileUploadForm = require("../file-upload-form/file-upload-form");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ProfileUpdate = ({
  user,
  token,
  setUser
}) => {
  const [Username, setUsername] = (0, _react.useState)("");
  const [Password, setPassword] = (0, _react.useState)("");
  const [Email, setEmail] = (0, _react.useState)("");
  const [Birthday, setBirthday] = (0, _react.useState)("");
  const [Bio, setBio] = (0, _react.useState)("");
  const [showPicUploadModal, setShowPicUploadModal] = (0, _react.useState)(false);
  const [uploadedPicUrl, setUploadedPicUrl] = (0, _react.useState)("");
  const handlePicUpload = url => {
    setUploadedPicUrl(url);
    setShowPicUploadModal(false); // Close the modal after upload
  };
  const handleUpdateSubmit = event => {
    event.preventDefault();
    console.log("profile-update User:", user);
    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
      Bio: Bio,
      ProfilePic: UploadedPicUrl || user.ProfilePic
    };
    fetch(`https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        alert("Data updated!", user, data);
        return response.json();
      } else {
        alert("Update failed :(", user);
      }
    }).then(data => {
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      setUser(data);
      window.location.replace("/");
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "text-light",
    style: {
      display: "block",
      position: "initial"
    }
  }, /*#__PURE__*/_react.default.createElement("h3", null, "Edit profile"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_Form.default, {
    onSubmit: handleUpdateSubmit
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formUpUsername"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Username"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    type: "text",
    value: Username,
    onChange: e => setUsername(e.target.value),
    required: true,
    minLength: "3",
    className: "text-light"
  })), /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formUpPassword"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Password"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    type: "password",
    value: Password,
    onChange: e => setPassword(e.target.value),
    required: true,
    minLength: "8",
    className: "text-light"
  })), /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formUpEmail"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Email"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    type: "email",
    value: Email,
    onChange: e => setEmail(e.target.value),
    required: true,
    className: "text-light"
  })), /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formUpBirthday"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Birthday"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    type: "date",
    value: Birthday,
    onChange: e => setBirthday(e.target.value),
    required: true,
    className: "text-light"
  })), /*#__PURE__*/_react.default.createElement(_Form.default.Group, {
    controlId: "formUpBio"
  }, /*#__PURE__*/_react.default.createElement(_Form.default.Label, null, "Bio"), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    type: "textarea",
    rows: 3,
    value: Bio,
    onChange: e => setBio(e.target.value),
    className: "text-light"
  })), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: () => setShowPicUploadModal(true)
  }, "Upload Profile Picture"), /*#__PURE__*/_react.default.createElement(_Modal.default, {
    show: showPicUploadModal,
    onHide: () => setShowPicUploadModal(false)
  }, /*#__PURE__*/_react.default.createElement(_Modal.default.Header, {
    closeButton: true
  }, /*#__PURE__*/_react.default.createElement(_Modal.default.Title, null, "Upload Profile Picture")), /*#__PURE__*/_react.default.createElement(_Modal.default.Body, null, /*#__PURE__*/_react.default.createElement(_fileUploadForm.FileUploadForm, {
    token: token,
    onUpload: handlePicUpload
  }))), /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "primary",
    type: "submit"
  }, "Save changes")), /*#__PURE__*/_react.default.createElement(_Form.default, {
    method: "get",
    action: "/"
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "primary",
    type: "submit"
  }, "Back")));
};
exports.ProfileUpdate = ProfileUpdate;
},{"./profile-update.scss":"components/movie-card/movie-card.scss","../file-upload-form/file-upload-form":"components/file-upload-form/file-upload-form.jsx"}],"img/patch-check-fill.svg":[function(require,module,exports) {
module.exports = "/patch-check-fill.484a25e2.svg";
},{}],"components/profile-view/profile-view.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _movieCard = require("../movie-card/movie-card");
var _profileUpdate = require("../profile-update/profile-update");
var _Col = _interopRequireDefault(require("react-bootstrap/Col"));
var _Row = _interopRequireDefault(require("react-bootstrap/Row"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _Modal = _interopRequireDefault(require("react-bootstrap/Modal"));
var _patchCheckFill = _interopRequireDefault(require("../../img/patch-check-fill.svg"));
require("./profile-view.scss");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ProfileView = ({
  token,
  user,
  movies,
  setUser
}) => {
  const {
    Username: profileUsername
  } = (0, _reactRouterDom.useParams)();
  const [viewedUser, setViewedUser] = (0, _react.useState)(null);
  const [loading, setLoading] = (0, _react.useState)(true);
  const [showUpdateModal, setShowUpdateModal] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (!profileUsername) return;
    fetch(`https://chaseflix-481df0d77a4b.herokuapp.com/users/${profileUsername}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.ok) return response.json();
      throw new Error("User not found");
    }).then(userData => {
      setViewedUser(userData);
      setLoading(false);
    }).catch(error => {
      console.error("Error fetching user:", error);
      setLoading(false);
    });
  }, [profileUsername, token]);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  if (loading) {
    return /*#__PURE__*/_react.default.createElement("div", null, "Loading...");
  }
  if (!viewedUser) {
    return /*#__PURE__*/_react.default.createElement("div", null, "User not found.");
  }
  const birthdayDate = new Date(viewedUser.Birthday);
  const formattedBirthday = birthdayDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const favoriteMovieList = movies.filter(movie => viewedUser.FavoriteMovies.includes(movie._id));
  const isOwnProfile = user && user._id === viewedUser._id;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Row.default, {
    className: "h-100 text-light"
  }, /*#__PURE__*/_react.default.createElement(_Col.default, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: viewedUser.ProfilePic,
    className: "profile-pic",
    alt: "Profile"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "username-container"
  }, /*#__PURE__*/_react.default.createElement("h2", null, viewedUser.Username), viewedUser.Verified && /*#__PURE__*/_react.default.createElement("img", {
    src: _patchCheckFill.default,
    className: "verified-img",
    alt: "Verified Logo"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "my-2"
  }, /*#__PURE__*/_react.default.createElement("p", null, viewedUser.Bio), /*#__PURE__*/_react.default.createElement("p", null, "Birthday: ", formattedBirthday)), isOwnProfile && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "primary",
    onClick: handleShowUpdateModal
  }, "Edit Profile")))), /*#__PURE__*/_react.default.createElement(_Row.default, null, /*#__PURE__*/_react.default.createElement("h2", null, "Favorite Movies"), favoriteMovieList.map(movie => /*#__PURE__*/_react.default.createElement(_Col.default, {
    className: "mb-5",
    md: 3,
    key: movie._id
  }, /*#__PURE__*/_react.default.createElement(_movieCard.MovieCard, {
    movie: movie
  })))), /*#__PURE__*/_react.default.createElement(_Modal.default, {
    show: showUpdateModal,
    onHide: handleCloseUpdateModal
  }, /*#__PURE__*/_react.default.createElement(_Modal.default.Header, {
    closeButton: true
  }, /*#__PURE__*/_react.default.createElement(_Modal.default.Title, null, "Edit Profile")), /*#__PURE__*/_react.default.createElement(_Modal.default.Body, null, /*#__PURE__*/_react.default.createElement(_profileUpdate.ProfileUpdate, {
    user: viewedUser,
    token: token,
    setUser: setUser
  }))));
};
exports.ProfileView = ProfileView;
},{"../movie-card/movie-card":"components/movie-card/movie-card.jsx","../profile-update/profile-update":"components/profile-update/profile-update.jsx","../../img/patch-check-fill.svg":"img/patch-check-fill.svg","./profile-view.scss":"components/movie-card/movie-card.scss"}],"components/landing-view/landing-view.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LandingView = void 0;
var _react = _interopRequireDefault(require("react"));
var _Row = _interopRequireDefault(require("react-bootstrap/Row"));
var _Col = _interopRequireDefault(require("react-bootstrap/Col"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _reactRouterDom = require("react-router-dom");
require("./landing-view.scss");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LandingView = ({
  user
}) => {
  return /*#__PURE__*/_react.default.createElement(_Row.default, {
    className: "text-light"
  }, /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", {
    className: "d-flex header my-5 justify-content-center"
  }, "ChaseFlix"))), /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Welcome!"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h4", {
    className: "mt-3"
  }, "On ChaseFlix you can browse a collection of movies, read information about them, and add them to a list of your favorites to show everyone your exquisite taste!"))), !user ? /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12,
    className: "my-5"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Ready to check it out? Join today")), /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex my-3 justify-content-center"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: " fixed-width"
  }, "Signup:"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/signup"
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "mx-3"
  }, "Here"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "justify-content-center d-flex my-3"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: " fixed-width"
  }, "Login: "), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/login"
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "mx-3"
  }, "Here")))) : /*#__PURE__*/_react.default.createElement(_Col.default, {
    md: 12,
    className: "my-5"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex my-3 justify-content-center"
  }, /*#__PURE__*/_react.default.createElement("h2", null, "Thanks for the support, ", user.Username, "!"))));
};
exports.LandingView = LandingView;
},{"./landing-view.scss":"components/movie-card/movie-card.scss"}],"components/user-list/user-list.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserList = void 0;
var _ListGroup = _interopRequireDefault(require("react-bootstrap/ListGroup"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
require("./user-list.scss");
var _patchCheckFill = _interopRequireDefault(require("../../img/patch-check-fill.svg"));
var _Col = _interopRequireDefault(require("react-bootstrap/Col"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserList = ({
  user
}) => {
  return /*#__PURE__*/React.createElement(_Col.default, {
    className: "justify-content-md-center centered-row"
  }, /*#__PURE__*/React.createElement(_ListGroup.default, {
    horizontal: true,
    className: "my-2"
  }, /*#__PURE__*/React.createElement(_ListGroup.default.Item, {
    className: "text-light user-item d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("h3", null, user.Username, user.Verified && /*#__PURE__*/React.createElement("img", {
    src: _patchCheckFill.default,
    className: "verified-logo",
    alt: "verified logo"
  }))), /*#__PURE__*/React.createElement(_ListGroup.default.Item, {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React.createElement(_Form.default, {
    method: "get",
    action: `/users/${user.Username}`
  }, /*#__PURE__*/React.createElement(_Button.default, {
    variant: "primary",
    type: "submit"
  }, "View Page")))));
};
exports.UserList = UserList;
},{"./user-list.scss":"components/movie-card/movie-card.scss","../../img/patch-check-fill.svg":"img/patch-check-fill.svg"}],"img/search.svg":[function(require,module,exports) {
module.exports = "/search.1e31d98f.svg";
},{}],"components/movie-search/movie-search.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieSearch = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
require("./movie-search.scss");
var _search = _interopRequireDefault(require("../../img/search.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MovieSearch = ({
  movies,
  setFilteredMovies
}) => {
  const [searchQuery, setSearchQuery] = (0, _react.useState)([]);
  const handleSearch = event => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = movies.filter(movie => movie.Title.toLowerCase().includes(query.toLowerCase()));
    setFilteredMovies(filtered);
  };
  return /*#__PURE__*/_react.default.createElement(_Form.default, {
    className: "mb-3 text-light image-and-search-container"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _search.default,
    alt: "search icon",
    className: "search-icon"
  }), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    type: "text",
    value: searchQuery,
    onChange: handleSearch,
    className: "text-light"
  }));
};
exports.MovieSearch = MovieSearch;
},{"./movie-search.scss":"components/movie-card/movie-card.scss","../../img/search.svg":"img/search.svg"}],"components/user-search/user-search.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserSearch = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
var _search = _interopRequireDefault(require("../../img/search.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const UserSearch = ({
  users,
  setFilteredUsers
}) => {
  const [searchQuery, setSearchQuery] = (0, _react.useState)("");
  const handleSearch = event => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = users.filter(user => user.Username.toLowerCase().includes(query.toLowerCase()));
    setFilteredUsers(filtered);
  };
  return /*#__PURE__*/_react.default.createElement(_Form.default, {
    className: "mb-3 text-light image-and-search-container"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _search.default,
    alt: "search icon",
    className: "search-icon"
  }), /*#__PURE__*/_react.default.createElement(_Form.default.Control, {
    type: "text",
    value: searchQuery,
    onChange: handleSearch,
    className: "text-light"
  }));
};
exports.UserSearch = UserSearch;
},{"../../img/search.svg":"img/search.svg"}],"components/navigation-bar/navigation-bar.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationBar = void 0;
var _reactBootstrap = require("react-bootstrap");
var _reactRouterDom = require("react-router-dom");
var _NavDropdown = _interopRequireDefault(require("react-bootstrap/NavDropdown"));
require("./navigation-bar.scss");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const NavigationBar = ({
  user,
  onLoggedOut,
  handleShow
}) => {
  return /*#__PURE__*/React.createElement(_reactBootstrap.Navbar, {
    bg: "dark",
    className: "text-light",
    "data-bs-theme": "dark",
    expand: "lg"
  }, /*#__PURE__*/React.createElement(_reactBootstrap.Container, null, /*#__PURE__*/React.createElement(_reactBootstrap.Navbar.Brand, {
    as: _reactRouterDom.Link,
    to: `./`
  }, "ChaseFlix"), /*#__PURE__*/React.createElement(_reactBootstrap.Navbar.Toggle, {
    "aria-controls": "responsive-navbar-nav"
  }), /*#__PURE__*/React.createElement(_reactBootstrap.Navbar.Collapse, {
    id: "responsive-navbar=nav"
  }, /*#__PURE__*/React.createElement(_reactBootstrap.Nav, {
    className: "me-auto"
  }, /*#__PURE__*/React.createElement(_reactBootstrap.Nav.Link, {
    as: _reactRouterDom.Link,
    to: "./Movies",
    className: "mx-2"
  }, "Movies"), /*#__PURE__*/React.createElement(_reactBootstrap.Nav.Link, {
    as: _reactRouterDom.Link,
    to: "./Users",
    className: "mx-2"
  }, "Users")), user ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_NavDropdown.default, {
    title: "Account",
    id: "collapsible-nav-dropdown"
  }, /*#__PURE__*/React.createElement(_NavDropdown.default.Item, {
    as: _reactRouterDom.Link,
    to: `./Users/${user.Username}`,
    className: "mx-2"
  }, "Profile"), /*#__PURE__*/React.createElement(_NavDropdown.default.Item, {
    onClick: onLoggedOut,
    className: "mx-2"
  }, "Logout"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactBootstrap.Nav.Link, {
    as: _reactRouterDom.Link,
    to: "/signup",
    className: "mx-2"
  }, "Signup"), /*#__PURE__*/React.createElement(_reactBootstrap.Nav.Link, {
    as: _reactRouterDom.Link,
    to: "/login",
    className: "mx-2"
  }, "Login")), /*#__PURE__*/React.createElement("br", null))));
};
exports.NavigationBar = NavigationBar;
},{"./navigation-bar.scss":"components/movie-card/movie-card.scss"}],"components/main-view/main-view.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainView = void 0;
var _react = require("react");
var _movieCard = require("../movie-card/movie-card");
var _movieView = require("../movie-view/movie-view");
var _loginView = require("../login-view/login-view");
var _signupView = require("../signup-view/signup-view");
var _profileView = require("../profile-view/profile-view");
var _landingView = require("../landing-view/landing-view");
var _userList = require("../user-list/user-list");
var _movieSearch = require("../movie-search/movie-search");
var _userSearch = require("../user-search/user-search");
var _Row = _interopRequireDefault(require("react-bootstrap/Row"));
var _Col = _interopRequireDefault(require("react-bootstrap/Col"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _fileUploadForm = require("../file-upload-form/file-upload-form");
var _reactRouterDom = require("react-router-dom");
var _navigationBar = require("../navigation-bar/navigation-bar");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MainView = () => {
  //Stored information for user within localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [dataLoaded, setDataLoaded] = (0, _react.useState)(false);

  //Used to set movies from API into array
  const [movies, setMovies] = (0, _react.useState)([]);
  const [user, setUser] = (0, _react.useState)(storedUser ? storedUser : null);

  //keeps track of token once user logs in
  const [token, setToken] = (0, _react.useState)(storedToken ? storedToken : null);
  const [users, setUsers] = (0, _react.useState)([]);
  const [FavoriteMovies, setFavoriteMovies] = (0, _react.useState)(null);
  const [filteredMovies, setFilteredMovies] = (0, _react.useState)(movies);
  const [filteredUsers, setFilteredUsers] = (0, _react.useState)(users);
  const onLoggedIn = authData => {
    console.log("Login token:", authData.token); // Log to verify token
    setUser(authData.user);
    setToken(authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
    localStorage.setItem("token", authData.token);
  };
  const onLogout = () => {
    localStorage.clear();
  };
  (0, _react.useEffect)(() => {
    setFilteredMovies(movies);
    setFilteredUsers(users);
  }, [movies], [users]);
  (0, _react.useEffect)(() => {
    if (token) {
      fetch("https://chaseflix-481df0d77a4b.herokuapp.com/movies", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => response.json()).then(data => {
        const moviesFromApi = data.map(movie => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Born: movie.Director.Born,
              Death: movie.Director.Death
            },
            Featured: movie.Featured.toString(),
            ImagePath: movie.ImagePath,
            ImageBackdrop: movie.ImageBackdrop,
            Similar: movie.Similar
          };
        });
        setMovies(moviesFromApi);
      }).catch(error => console.error("Error fetching movies:", error));
      fetchUsers();
    }
  }, [token]);
  const fetchUsers = () => {
    fetch("https://chaseflix-481df0d77a4b.herokuapp.com/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) throw new Error("Invalid token");
      return response.json();
    }).then(data => {
      const usersFromApi = data.map(user => {
        return {
          _id: user._id,
          Username: user.Username,
          FavoriteMovies: user.FavoriteMovies,
          Verified: user.Verified,
          Bio: user.Bio,
          ProfilePic: user.ProfilePic
        };
      });
      setUsers(usersFromApi);
      // Assuming the first user is the logged-in user
      setUser(usersFromApi.find(user => user.Username === storedUser.Username));
      setDataLoaded(true);
    }).catch(error => {
      console.error("Error fetching users:", error);
      setDataLoaded(true);
    });
  };
  if (token && !dataLoaded) {
    // If the token is available but data is not fetched yet, show loading
    return /*#__PURE__*/React.createElement("div", null, "Loading...");
  }
  return /*#__PURE__*/React.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/React.createElement(_navigationBar.NavigationBar, {
    user: user,
    onLoggedOut: () => {
      setUser(null);
      setToken(null);
      localStorage.clear();
    }
  }), /*#__PURE__*/React.createElement(_Row.default, {
    className: "justify-content-md-center"
  }, /*#__PURE__*/React.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/signup",
    element: /*#__PURE__*/React.createElement(React.Fragment, null, user ? /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/"
    }) : /*#__PURE__*/React.createElement(_Col.default, {
      className: "text-light",
      xs: 12,
      sm: 10,
      md: 8,
      lg: 5
    }, /*#__PURE__*/React.createElement("h2", null, "Sign up:"), /*#__PURE__*/React.createElement(_signupView.SignupView, {
      user: user
    })))
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/login",
    element: /*#__PURE__*/React.createElement(React.Fragment, null, user ? /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/"
    }) : /*#__PURE__*/React.createElement(_Col.default, {
      xs: 12,
      sm: 10,
      md: 8,
      lg: 5
    }, /*#__PURE__*/React.createElement(_loginView.LoginView, {
      onLoggedIn: onLoggedIn
    })))
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/movies/:id",
    element: /*#__PURE__*/React.createElement(React.Fragment, null, !user ? /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/login",
      replace: true
    }) : movies.length === 0 ? /*#__PURE__*/React.createElement(_Col.default, null, "The list is empty!") : /*#__PURE__*/React.createElement(_Col.default, {
      md: 8
    }, /*#__PURE__*/React.createElement(_movieView.MovieView, {
      movies: movies,
      user: user,
      token: token,
      setUser: setUser,
      setFilteredMovies: setFilteredMovies
    })))
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/movies",
    element: /*#__PURE__*/React.createElement(React.Fragment, null, !user ? /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/login",
      replace: true
    }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Col.default, {
      className: "justify-content-md-center my-5 text-light",
      xs: 12,
      sm: 8,
      md: 6,
      lg: 4
    }, /*#__PURE__*/React.createElement(_movieSearch.MovieSearch, {
      movies: movies,
      setFilteredMovies: setFilteredMovies
    })), /*#__PURE__*/React.createElement(_Row.default, null, filteredMovies.length === 0 ? /*#__PURE__*/React.createElement(_Col.default, {
      className: "text-light"
    }, /*#__PURE__*/React.createElement("div", {
      className: "justify-content-md-center"
    }, "No results found")) : /*#__PURE__*/React.createElement(React.Fragment, null, filteredMovies.map(movie => /*#__PURE__*/React.createElement(_Col.default, {
      className: "mb-5",
      xs: 12,
      sm: 6,
      md: 3,
      key: movie._id
    }, /*#__PURE__*/React.createElement(_movieCard.MovieCard, {
      movie: movie,
      key: movie._id,
      user: user,
      token: token,
      setUser: setUser,
      showFavoriteButtons: true
    })))))))
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Col.default, null, /*#__PURE__*/React.createElement(_landingView.LandingView, {
      movies: movies,
      user: user
    })))
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/users",
    element: /*#__PURE__*/React.createElement(React.Fragment, null, !user ? /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/login",
      replace: true
    }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Col.default, {
      className: "justify-content-md-center my-5 text-light",
      xs: 8,
      sm: 8,
      md: 6,
      lg: 4
    }, /*#__PURE__*/React.createElement(_userSearch.UserSearch, {
      users: users,
      setFilteredUsers: setFilteredUsers
    })), /*#__PURE__*/React.createElement(_Row.default, null, filteredUsers.length === 0 ? /*#__PURE__*/React.createElement(_Col.default, {
      className: "text-light"
    }, "No results") : /*#__PURE__*/React.createElement(React.Fragment, null, filteredUsers.map(user => /*#__PURE__*/React.createElement(_Col.default, {
      className: "mb-4",
      key: user._id,
      sm: 12,
      md: 12,
      lg: 6
    }, /*#__PURE__*/React.createElement(_userList.UserList, {
      user: user
    })))))))
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/users/:Username",
    element: /*#__PURE__*/React.createElement(React.Fragment, null, user ? /*#__PURE__*/React.createElement(_Col.default, {
      md: 12
    }, /*#__PURE__*/React.createElement(_profileView.ProfileView, {
      setUser: setUser,
      user: user,
      token: token,
      movies: movies,
      showFavoriteButtons: true
    })) : /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/login",
      replace: true
    }))
  }))));
};
exports.MainView = MainView;
},{"../movie-card/movie-card":"components/movie-card/movie-card.jsx","../movie-view/movie-view":"components/movie-view/movie-view.jsx","../login-view/login-view":"components/login-view/login-view.jsx","../signup-view/signup-view":"components/signup-view/signup-view.jsx","../profile-view/profile-view":"components/profile-view/profile-view.jsx","../landing-view/landing-view":"components/landing-view/landing-view.jsx","../user-list/user-list":"components/user-list/user-list.jsx","../movie-search/movie-search":"components/movie-search/movie-search.jsx","../user-search/user-search":"components/user-search/user-search.jsx","../file-upload-form/file-upload-form":"components/file-upload-form/file-upload-form.jsx","../navigation-bar/navigation-bar":"components/navigation-bar/navigation-bar.jsx"}],"index.jsx":[function(require,module,exports) {
"use strict";

var _client = require("react-dom/client");
var _mainView = require("./components/main-view/main-view");
require("./index.scss");
var _Container = _interopRequireDefault(require("react-bootstrap/Container"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ChaseflixApplication = () => {
  return /*#__PURE__*/React.createElement(_Container.default, null, /*#__PURE__*/React.createElement(_mainView.MainView, null));
};
const container = document.querySelector("#root");
const root = (0, _client.createRoot)(container);
root.render( /*#__PURE__*/React.createElement(ChaseflixApplication, null));
},{"./components/main-view/main-view":"components/main-view/main-view.jsx","./index.scss":"components/movie-card/movie-card.scss"}]},{},["index.jsx"], null)
//# sourceMappingURL=/src.78399e21.js.map