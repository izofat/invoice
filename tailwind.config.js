/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                "gray-theme": "rgb(205,205,204)",
                "blue-title" : "rgb(92,155,229)",
                "blue-theme": "rgb(79,147,226)",
                "blue-background" : "rgb(233,243,255)",
                "blue-hover" : "rgb(59,96,246)",
                "warning" : "rgb(185 28 28)",
            },
            fontSize: {
                "4xs": ".375rem", // 6px
                "3xs": ".5rem", // 8px
                "2xs": ".625rem", // 10px
            },
            spacing : {
                'description' : '600px',
                'amount' : '170px',
                'account-number' : '320px'
            }
        },
    },

    plugins: [],
};
