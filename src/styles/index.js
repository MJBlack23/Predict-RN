export const backgroundColor = '#333'
export const foregroundColor = '#ccc'
export const tertiaryColor = '#ffd740'

export const mergeStyles = (main, secondary = {}) =>
  Object.assign({}, main, secondary)

export default {
  container: {
    flex: 1,
    backgroundColor,
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingTop: 25,
  },
  containerCenter: {
    flex: 1,
    backgroundColor,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 25,
  },
  containerLeft: {
    flex: 1,
    backgroundColor,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 25,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 36,
    color: tertiaryColor,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subHeaderText: {
    fontSize: 30,
    color: foregroundColor,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  text: {
    fontSize: 24,
    color: foregroundColor,
  },
  altText: {
    fontSize: 24,
    color: tertiaryColor,
  },
  clickable: {
    padding: 10,
  },
  horizontalRule: {
    borderBottomColor: foregroundColor,
    borderBottomWidth: 1,
  },
  textContainer: {
    marginLeft: 25
  },
  imageContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150
  }
}
