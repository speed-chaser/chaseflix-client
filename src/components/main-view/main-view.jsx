import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-update/profile-update";
import { UserList } from "../user-list/user-list";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  //Stored information for user within localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [dataLoaded, setDataLoaded] = useState(false);

  //Used to set movies from API into array
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);

  //keeps track of token once user logs in
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [users, setUsers] = useState([]);
  const [FavoriteMovies, setFavoriteMovies] = useState(null);
  console.log("users:", users);
  console.log("user:", user);

  const onLoggedIn = (user, token) => {
    setUser(user); // Set the user state with the logged-in user
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    console.log("user is:", user);
  };

  const onLogout = () => {
    localStorage.clear();
  };

  console.log("MainView user:", user);
  console.log("MainView setUser:", setUser);

  useEffect(() => {
    if (token) {
      fetch("https://chaseflix-481df0d77a4b.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((movie) => {
            return {
              _id: movie._id,
              Title: movie.Title,
              Description: movie.Description,
              Genre: {
                Name: movie.Genre.Name,
                Description: movie.Genre.Description,
              },
              Director: {
                Name: movie.Director.Name,
                Bio: movie.Director.Bio,
                Born: movie.Director.Born,
                Death: movie.Director.Death,
              },
              Featured: movie.Featured.toString(),
              ImagePath: movie.ImagePath,
              ImageBackdrop: movie.ImageBackdrop,
              Similar: movie.Similar,
            };
          });

          setMovies(moviesFromApi);
        })
        .catch((error) => console.error("Error fetching movies:", error));

      fetchUsers();
    }
  }, [token]);

  const fetchUsers = () => {
    fetch("https://chaseflix-481df0d77a4b.herokuapp.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Invalid token");
        return response.json();
      })
      .then((data) => {
        const usersFromApi = data.map((user) => {
          return {
            _id: user._id,
            Username: user.Username,
            FavoriteMovies: user.FavoriteMovies,
            Verified: user.Verified,
          };
        });

        setUsers(usersFromApi);
        // Assuming the first user is the logged-in user
        setUser(
          usersFromApi.find((user) => user.Username === storedUser.Username)
        );
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setDataLoaded(true);
      });
  };

  if (token && !dataLoaded) {
    // If the token is available but data is not fetched yet, show loading
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col className="text-light" xs={12} sm={6} md={5}>
                    Sign up:
                    <SignupView user={user} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={onLoggedIn} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        className="mb-4"
                        key={movie._id}
                        xs={12}
                        sm={6}
                        md={3}
                      >
                        <MovieCard
                          movie={movie}
                          key={movie._id}
                          user={user}
                          token={token}
                          setUser={setUser}
                          showFavoriteButtons={true}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        className="mb-4"
                        key={movie._id}
                        xs={12}
                        sm={6}
                        md={3}
                      >
                        <MovieCard
                          movie={movie}
                          key={movie._id}
                          user={user}
                          token={token}
                          setUser={setUser}
                          showFavoriteButtons={true}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path="/users"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    {users.map((user) => (
                      <Col className="mb-4" key={user._id} md={12}>
                        <UserList user={user} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/users/:Username"
            element={
              <>
                {user ? (
                  <Col md={12}>
                    <ProfileView
                      setUser={setUser}
                      user={user}
                      token={token}
                      movies={movies}
                      showFavoriteButtons={true}
                    />
                  </Col>
                ) : (
                  <Navigate to="/login" replace />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
