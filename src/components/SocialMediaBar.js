          
import React from 'react';
import * as materialUI from '@material-ui/core';
import * as icons from '@ant-design/icons';

function SocialMediaBar() {
    return (
        <materialUI.ButtonGroup className="social-media-group" variant="text" color="primary" orientation="horizontal" aria-label="text primary button group">
            <a href="https://instagram.com/breaktime">
                <materialUI.Button>
                    <icons.InstagramFilled className='social-media-icon'/>
                </materialUI.Button>
            </a>
            <a href="https://www.facebook.com/breaktimeboston">
                <materialUI.Button >
                    <icons.FacebookFilled className='social-media-icon'/>
                </materialUI.Button>
            </a>
            <a href="https://www.linkedin.com/company/breaktimeboston/">
                <materialUI.Button>
                    <icons.LinkedinFilled className='social-media-icon'/>
                </materialUI.Button>
            </a>
            <a href="https://twitter.com/breaktimeboston">
                <materialUI.Button>
                    <icons.TwitterOutlined className='social-media-icon'/>
                </materialUI.Button>
            </a>            
        </materialUI.ButtonGroup>
    );
}

export default SocialMediaBar; 
            