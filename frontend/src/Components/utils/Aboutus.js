import React from 'react'
import './Aboutus.css'

function Aboutus() {
    return (
        <>
            <div className='page'>
                <div className='heading'>
                    Who We Are
                </div>

                <div className='img-box'>
                    <img src='/images/about-us.jpg' alt='' />
                </div>

                <div className='group-heading'>
                    <p>
                        Group Members
                    </p>
                </div>

                <div className='member-grid'>
                    <div className='row'>
                        <div className='grid-item'>
                            <div className='dev-name'>
                                P.V.Chandra Shekar
                            </div>
                            <div className='dev-roll'>
                                S20200010154
                            </div>
                        </div>

                        <div className='grid-item'>
                            <div className='dev-name'>
                                N.Sudheer
                            </div>
                            <div className='dev-roll'>
                                S20200010152
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='grid-item'>
                            <div className='dev-name'>
                                K. Rahul
                            </div>
                            <div className='dev-roll'>
                                S20200010091
                            </div>
                        </div>
                        <div className='grid-item'>
                            <div className='dev-name'>
                                M.S.Dheeraj
                            </div>
                            <div className='dev-roll'>
                                S20200010128
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='grid-item'>
                            <div className='dev-name'>
                                N.Dinesh
                            </div>
                            <div className='dev-roll'>
                                S20200010151
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Aboutus