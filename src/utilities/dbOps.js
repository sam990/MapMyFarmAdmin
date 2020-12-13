import AWS, { CognitoIdentityServiceProvider } from "aws-sdk";
import { Auth, API, graphqlOperation } from "aws-amplify";
import awsconfig from "aws-exports";
import * as queries from "graphql/queries";
import LatLng from "utilities/LatLng";

export async function updateCredentials() {
    const res = await Auth.currentCredentials();
    AWS.config.update({
        region: awsconfig["aws_cognito_region"],
        credentials: res
    });
}

export async function createAgent(options) {
    const body = {
        username: options.phoneNumber,
        password: options.password,
        attributes: {
            name: options.firstName,
            family_name: options.lastName,
            email: options.email,
            phone_number: options.phoneNumber,
            locale: options.locale,
            "custom:district": options.district,
            "custom:state": options.state,
            "custom:detailsEntered": "1",
        }
    }

    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    const res = await API.post('adminQueries', '/adminCreateAgent', {
        body: body,
        headers: {
            Authorization: token,
        },
    });
    console.log(res);
    return res;
}

export async function changePassword(options) {
    const body = {
        username: options.username,
        password: options.password,
    }

    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    const res = await API.post('adminQueries', '/adminChangePassword', {
        body: body,
        headers: {
            Authorization: token,
        },
    });
    console.log(res);
    return res;
}

export function parseAttributes(attribs) {
    const undefinedParser = value => value ? value : "";
  
    let m = {};
  
    for(let i of attribs) {
      m[i.Name] = i.Value;
    }
  
    m["fullName"] = undefinedParser(m["name"]) + " " + undefinedParser(m["family_name"]);
    return m;
} 

export async function getNumberOfUsers() {
    let cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
      
    const res = await cognitoIdentityServiceProvider.describeUserPool( {UserPoolId: awsconfig["aws_user_pools_id"]}).promise();
    return res.UserPool.EstimatedNumberOfUsers;
}

export async function getUsersInGroup(groupName) {
    let cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
    let forwardToken = null;
    let remaining = true;

    let users = [];

    while (remaining) {

        const res = await cognitoIdentityServiceProvider.listUsersInGroup({
            UserPoolId: awsconfig["aws_user_pools_id"],
            GroupName: groupName,
            NextToken: forwardToken,
        }).promise();

        users.push(...res.Users.map(val => parseAttributes(val.Attributes) ));

        if (res.NextToken) {
            forwardToken = res.NextToken;
        } else {
            remaining = false;
        }
    }

    return users;
}

export async function getUser(sub) {
    let cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
    const res = await cognitoIdentityServiceProvider.listUsers({
        UserPoolId: awsconfig["aws_user_pools_id"],
        Filter: `sub = \"${sub}\"`,
    }).promise();
    return parseAttributes(res.Users[0].Attributes); 
}

export async function getAllFarms() {

    let forwardToken = null;
    let remaining = true;

    let farms = [];

    while(remaining) {
        const res = await API.graphql(graphqlOperation(queries.listFarms, { limit: 100 , nextToken: forwardToken}));
        
        farms.push(...res.data.listFarms.items);

        if(res.data.listFarms.nextToken == null) {
            remaining = false;
        } else {
            forwardToken = res.data.listFarms.nextToken;
        }
    }
    return farms;
}

export async function getAgentFarms(sub) {

    let forwardToken = null;
    let remaining = true;

    let farms = [];

    while(remaining) {
        const res = await API.graphql(graphqlOperation(queries.listFarms, { filter: { agentSub: { eq: sub } } , limit: 100 , nextToken: forwardToken}));
        
        farms.push(...res.data.listFarms.items);

        if(res.data.listFarms.nextToken == null) {
            remaining = false;
        } else {
            forwardToken = res.data.listFarms.nextToken;
        }
    }
    return farms;
}

export async function getUserFarms(sub) {
    let forwardToken = null;
    let remaining = true;

    let farms = [];

    while(remaining) {
        const res = await API.graphql(graphqlOperation(queries.listUserFarms, { ownerSub: sub, limit: 100 , nextToken: forwardToken}));
        
        farms.push(...res.data.listUserFarms.items);

        if(res.data.listUserFarms.nextToken == null) {
            remaining = false;
        } else {
            forwardToken = res.data.listUserFarms.nextToken;
        }
    }
    return farms;
}

export function getPathOfFarm(farm) {
    let path = [];
    for (let i = 0; i < farm.coordinatesLat.length; i++) {
        path.push(new LatLng(farm.coordinatesLat[i], farm.coordinatesLng[i]));
    }
    return path;
}

export async function getAllHarvests() {
    let forwardToken = null;
    let remaining = true;

    let harvests = [];

    while(remaining) {
        const res = await API.graphql(graphqlOperation(queries.listHarvests, { limit: 100 , nextToken: forwardToken}));
        
        harvests.push(...res.data.listHarvests.items);

        if(res.data.listHarvests.nextToken == null) {
            remaining = false;
        } else {
            forwardToken = res.data.listHarvests.nextToken;
        }
    }
    return harvests;
}

export async function getAgentHarvests(sub) {
    let forwardToken = null;
    let remaining = true;

    let harvests = [];

    while(remaining) {
        const res = await API.graphql(graphqlOperation(queries.listHarvests, { filter: { agentSub: { eq: sub } } ,  limit: 100 , nextToken: forwardToken}));
        
        harvests.push(...res.data.listHarvests.items);

        if(res.data.listHarvests.nextToken == null) {
            remaining = false;
        } else {
            forwardToken = res.data.listHarvests.nextToken;
        }
    }
    return harvests;
}

export async function getUserHarvests(sub) {
    let forwardToken = null;
    let remaining = true;

    let harvests = [];

    while(remaining) {
        const res = await API.graphql(graphqlOperation(queries.listUserHarvests, { ownerSub: sub, limit: 100 , nextToken: forwardToken}));
        
        harvests.push(...res.data.listUserHarvests.items);

        if(res.data.listUserHarvests.nextToken == null) {
            remaining = false;
        } else {
            forwardToken = res.data.listUserHarvests.nextToken;
        }
    }
    return harvests.length === 0 ? 0 : harvests;
}

async function getFarmMappingsOfFarm(farm_id) {
    let forwardToken = null;
    let remaining = true;

    let mappings = [];

    while(remaining) {
        const res = await API.graphql(graphqlOperation(queries.listFarmMappings, { filter: { farmID: { eq : farm_id } }, limit: 100 , nextToken: forwardToken}));
        
        mappings.push(...res.data.listFarmMappings.items);

        if(res.data.listFarmMappings.nextToken == null) {
            remaining = false;
        } else {
            forwardToken = res.data.listFarmMappings.nextToken;
        }
    }
    return mappings;
}

async function getBatchHarvests(harvestIDs) {
    const res = await API.graphql(graphqlOperation(queries.batchGetHarvests, { ids: harvestIDs }));
    return res.data.batchGetHarvests;
}

export async function getHarvestsOfFarm(farmID) {
    const mappings = await getFarmMappingsOfFarm(farmID);
    if (mappings.length === 0) {
        return 0;
    }
    return await getBatchHarvests(mappings.map(val => val.harvestID));
}



export default {
    getNumberOfUsers,
    getUsersInGroup,
    getAllFarms,
    getPathOfFarm,
    getUserFarms,
    getUser,
    updateCredentials,
    getAllHarvests,
    getUserHarvests,
    getHarvestsOfFarm,
    getAgentHarvests,
    getAgentFarms,
    createAgent,
    changePassword,
};