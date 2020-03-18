import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
		<Helmet defaultTitle="Blog by William JO">
			<meta name="google-site-verification" content="bD97RmikFNhjE1U_pTPuULvxJYskgGmJU0MZfnwa_vE" />	
		</Helmet>
        {children}
      </div>
    )
  }
}

export default Layout
