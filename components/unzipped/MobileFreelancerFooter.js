import Link from 'next/link'
import React from 'react'
import IconComponent from '../ui/icons/IconComponent'

function MobileFreelancerFooter() {
    return (

        <div className='px-2 py-3 d-flex justify-content-around' style={{ position: "fixed", bottom: 0 , width : '100%',backgroundColor:"white",borderTop: '1px solid rgba(0, 0, 0, 0.25)'}}>
            <Link href={'#'}><IconComponent name='footerHome' width="24" height="20" viewBox="0 0 24 20" fill="black" /></Link>
            <Link href={'#'}><IconComponent name='footerSearch' width="24" height="20" viewBox="0 0 24 20" fill="black" /></Link>
            <Link href={'#'}><IconComponent name='footerBag' width="24" height="20" viewBox="0 0 24 20" fill="black" /></Link>
            <Link href={'#'}><IconComponent name='footerPeople' width="24" height="20" viewBox="0 0 24 20" fill="black" /></Link>
            <Link href={'#'}><IconComponent name='footerPlus' width="24" height="20" viewBox="0 0 24 20" fill="black" /></Link>
            <Link href={'#'}><IconComponent name='footerMenu' width="30" height="20" viewBox="0 0 30 20" fill="black" /></Link>
        </div>


    )
}

export default MobileFreelancerFooter