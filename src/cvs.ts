import fetch from 'node-fetch';
import { VaccineQueryResult } from './vaccine-query-result';

interface CvsResponse {
	"responseMetaData": {
		"statusCode": string,
		"statusDesc": string,
		"conversationID": string,
		"refId": string
	}
}

export async function isCvsAvailable(zipCode: string): Promise<VaccineQueryResult> {
    const result = await fetch("https://www.cvs.com/Services/ICEAGPV1/immunization/1.0.0/getIMZStores", {
        "headers": {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:84.0) Gecko/20100101 Firefox/84.0",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/json",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "body": `{\"requestMetaData\":{\"appName\":\"CVS_WEB\",\"lineOfBusiness\":\"RETAIL\",\"channelName\":\"WEB\",\"deviceType\":\"DESKTOP\",\"deviceToken\":\"7777\",\"apiKey\":\"a2ff75c6-2da7-4299-929d-d670d827ab4a\",\"source\":\"ICE_WEB\",\"securityType\":\"apiKey\",\"responseFormat\":\"JSON\",\"type\":\"cn-dep\"},\"requestPayloadData\":{\"selectedImmunization\":[\"CVD\"],\"distanceInMiles\":35,\"imzData\":[{\"imzType\":\"CVD\",\"ndc\":[\"59267100002\",\"59267100003\",\"59676058015\",\"80777027399\"],\"allocationType\":\"1\"}],\"searchCriteria\":{\"addressLine\":\"${zipCode}\"}}}`,
        "method": "POST",
    });
    const cvsResponse = await result.json() as CvsResponse;

    return {
        vaccinesAreAvailable: cvsResponse.responseMetaData.statusDesc !== "No stores with immunizations found",
        vendorResponse: cvsResponse,
        vendorName: "CVS"
    }
}