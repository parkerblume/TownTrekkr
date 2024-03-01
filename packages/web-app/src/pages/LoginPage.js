// something here so it shows up :)
const app_name = 'town-trekkr'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production')
    {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else
    {
        return 'http://localhost:5000/' + route;
    }
}

// fetch url would now be fetch(buildPath('api/login'))