function PasswordToggle(e) {
  $(e.target).toggleClass('mdi-eye mdi-eye-off')
  var input = $(e.target).parent().prev('input')
  if (input.attr('type') == 'password') {
    input.attr('type', 'text')
  } else {
    input.attr('type', 'password')
  }
}
export default PasswordToggle
