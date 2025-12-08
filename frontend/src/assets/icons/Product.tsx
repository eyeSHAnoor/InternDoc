import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    active?: boolean
}

export default function Product({ active = false, ...props }: IconProps) {
    if (active) {
        return (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="22" height="22" fill="url(#pattern0_6_860)" />
            <defs>
                <pattern id="pattern0_6_860" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_6_860" transform="scale(0.0111111)" />
                </pattern>
                <image id="image0_6_860" width="90" height="90" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADbElEQVR4nO2cO2hUURCGP+MzovgsojYaLBTBwgcWprCwUbBMYaOd2IiNGkEkauGj9IWxUbBMG7uAIPgEUYuImhi1MAQjRmNMNGocOTBCCMlm79272TN354O/3DPn/PfuzHntguM4juM4juM4juM4jlNO5gNXga+AGNEX4ApQiyFaIjAurULfTVADDEdgWFoN6Riip8aNnj5aIjAsra5hiFrgshYYMaJ+4JK1YjiWpAMeAY4BK0lO+EyTtpE0rnkkoYJRpRLacKMprBUZxKxzo5lSaVLGeFa50UxL6jjuRlNUMQxmezFMiBiRecSIzCNGZB4xIvOIEZlHjMg8YkTmESMyjxiRecSIzCNGZB4xIvOIEZlHjMg8YkTmESMyjxiRecSIzNMTgYlT6QM54HwERk6lc+SAOWp2jG92j/Yt9HHamQXsBq4Dr4DvwADQoRcAd1i6bRkjG/Tp9hbxJrzRY/3Fle60FcKNnsPA05RfvQHgIrC60gOJkXAttRFoA35nlOtGtb2dVDkhpzZo3h0sc4F5BhywfM84bd49BbyvQEX/qDk/pKfcIxFoBGgFtpFjJDI9AfbpFDJXSKR6q9PDpeQEiVyDWqDXYxwxolGgHdgDzMAgYlCvdREVfk9uBjGsPs3j5ZiPr9Eduy6dFYUthdOlxJIc6E5GZodF2y5dwY5OEutB2liSEzWVYHCY2RzRt7aYWKeq2egXKca+BbiR4g8AuqrZ6OEixzsP2A88LiHWj2o2unOKcdYDF4BPGcR6Wc1GN09S3MJJ0O0CxS2NTlSr0ffHzQSWAUeB7jLEupv2/FCM6o8WpeYxJm8FbmoOzTpeaPNsKYe0lTZMItdf3cINOb4kKj0QiViPgO2lGuxGU3AG05j15lWSDnzT/0EKZ4sLdFNnE3Am0ssvklBh6ncImJ2lwUmM7tYl7pIC7dToCXeb5jUxpBG9ElHWOyiFOnBPv0IzE7a5Vg9d+yIwcVoKXTGMD/4TuAVszKDtufqg2iMwdbweZlnoiuF/4F7dlVpepjjr9C3vz2OhK4YwhdlbrgIwAQuBg8DzPBW62NmsB69D1gudFRbpFbEOq4XOIg1q0C9Lhc4ydTp3f2eh0OWBGl0IteqO3UQGf9aHEqaTTgbU61Zlp25bhp91nNQc7ziO4ziO4ziO41CAf1vpDJLmxsrnAAAAAElFTkSuQmCC" />
            </defs>
        </svg>)

    } else {
        return (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g opacity="0.75">
                    <rect width="22" height="22" fill="url(#pattern0_6_784)" />
                </g>
                <defs>
                    <pattern id="pattern0_6_784" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_6_784" transform="scale(0.0111111)" />
                    </pattern>
                    <image id="image0_6_784" width="90" height="90" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAELUlEQVR4nO2cS4gcRRjHy0fUSMREPfi4RPGgBHLwQQ7uwUMuCh7n4MWB6f7/KzPLIANJVhBpk0Oix/jAeFHwmKveAoLgE4LJwZCYaPTgEoyYpyY+Els+tsRlmcyjp3v7q5nvB//jdnX/pre+6qrqds4wDMMwDMMwDMMwDMOoDJK3k3yb5HmSeSQ5B+CtXq+31sUCyf0KxBXNfhcDWZbdCOCyAmFF87tcg9NOZqJXD0bcdQB4x8VCr9dbS/JNKTARCT4L4I2oiuFyClz0nwB2tlqt+92YyN+QXJBjjNuuix2OL3qhhDZFtonm4Nw3aZudTudeE83BKdJlrMR7/4CJ5qp0HS+ZaA4vhiLbimH1omuJix0qkGiiqScudqhAoommnrjYoQKJJpp64mKHCiSaaOqJix0qkGiiqScudqhAoommnrjYoQKJJpp64mKHCiSaaOqJix0qkDgrohfrljgsAH5ysQPgtbpFjpC9LnYajcYtQbbGO3tRzk3OcdXFZFl2s/f+WQDvAjhO8jcAF0h+IxsAvfdPR7PbUiNpmm6SXxfA6RHuhO9kWb/ZbK6v+7yjQHb0AHgRwNcFi8gFkvu89xvrvhatW2obJD8E8HdJVftaON5WN8tIn0pyLvS7lyouMIdJMtp9xhP0u6+S/HG1KzqAn6XPl+7JTTsKhk952Ad3gOQWN60okJyvyCHv/QsyhHTThAKx+XVySoaHSZLc5aYBBULzQZHCLAU6SZJHXczULZLjDQ8PknzOOXeDi426BbJYvpWHKHmf3MWCAmn5BDkj/XgV4/E0TR+UGTuSJ8OoSKYUdhVuS4GsvIR8XIbs8Or0M+EJ9lq/tgB8XqgtBZLyklL4BSIZ2QDYHu7aoW3JA97MigZwtMC1PwHgvQIfADg5y6Ivj3K9zWbzNpJNAF9N0N6VWRZ9YtB1ttvth0i+TvKXEto7NrOiSWb9ipusBJH86HrFreCP+vKsiv5s+Uhgfn7+bpI7AHxfdlsAPim0fqhAUl4wV8MYN/tPMoAnSb4vfWgF7ckx9xRepFUgLFeef2QKV/r4QoJNNEfJl977pyYSbKI5cAQja6alTl6NeRIXw3eQ5jqdzrrwkcDHSO5WuvklHzMy9OuSXFOa4HFEh+q90G63NwyZJ9gq8wShX8sjikwa7at0D8oQwZ/Kv1Cj0bhpnGMmSfJw2OJ1RoHE6gvdKPSR+wfJD5Ik2Tzpsbvd7q1hf8hBBVJX5ovSCt0oLBN8Omw7uKeidh4J28nOTl2hG1GADGGer6QA9KHVat1BchuAI1NT6LSTpunjsvAq3/qMutDFAsk7ZYuYbPuNstDFCMm5sGvpr2gKXcx0lr60uADgB/WFbhrI/n8QOhBm7PpJ/lV+FBlO1n2+U0F7aZVkT7hzr4TXOl6RPr7uczMMwzAMwzAMw3Da+ReHf/DNYzxfbAAAAABJRU5ErkJggg==" />
                </defs>
            </svg>


        );
    }
}
