export default {
  username: state =>
    (state.user.email ? state.user.email.split('@')[0] : state.user.email),
};
