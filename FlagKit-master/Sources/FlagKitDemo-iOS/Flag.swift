//
//  Copyright © 2017 Bowtie. All rights reserved.
//

import UIKit
import FlagKit

extension Flag {
    var localizedName: String {
        return Locale.current.localizedString(forRegionCode: countryCode) ?? "Other"
    }
    
    static let all: [Flag] = [
        Flag(countryCode: "AD")!,
        Flag(countryCode: "AE")!,
        Flag(countryCode: "AF")!,
        Flag(countryCode: "AG")!,
        Flag(countryCode: "AI")!,
        Flag(countryCode: "AL")!,
        Flag(countryCode: "AM")!,
        Flag(countryCode: "AO")!,
        Flag(countryCode: "AR")!,
        Flag(countryCode: "AS")!,
        Flag(countryCode: "AT")!,
        Flag(countryCode: "AU")!,
        Flag(countryCode: "AW")!,
        Flag(countryCode: "AX")!,
        Flag(countryCode: "BA")!,
        Flag(countryCode: "BB")!,
        Flag(countryCode: "BD")!,
        Flag(countryCode: "BE")!,
        Flag(countryCode: "BF")!,
        Flag(countryCode: "BG")!,
        Flag(countryCode: "BH")!,
        Flag(countryCode: "BI")!,
        Flag(countryCode: "BJ")!,
        Flag(countryCode: "BL")!,
        Flag(countryCode: "BM")!,
        Flag(countryCode: "BN")!,
        Flag(countryCode: "BO")!,
        Flag(countryCode: "BR")!,
        Flag(countryCode: "BS")!,
        Flag(countryCode: "BT")!,
        Flag(countryCode: "BV")!,
        Flag(countryCode: "BW")!,
        Flag(countryCode: "BY")!,
        Flag(countryCode: "BZ")!,
        Flag(countryCode: "CA")!,
        Flag(countryCode: "CC")!,
        Flag(countryCode: "CD")!,
        Flag(countryCode: "CF")!,
        Flag(countryCode: "CG")!,
        Flag(countryCode: "CH")!,
        Flag(countryCode: "CI")!,
        Flag(countryCode: "CK")!,
        Flag(countryCode: "CL")!,
        Flag(countryCode: "CM")!,
        Flag(countryCode: "CN")!,
        Flag(countryCode: "CO")!,
        Flag(countryCode: "CR")!,
        Flag(countryCode: "CU")!,
        Flag(countryCode: "CV")!,
        Flag(countryCode: "CW")!,
        Flag(countryCode: "CX")!,
        Flag(countryCode: "CY")!,
        Flag(countryCode: "CZ")!,
        Flag(countryCode: "DE")!,
        Flag(countryCode: "DJ")!,
        Flag(countryCode: "DK")!,
        Flag(countryCode: "DM")!,
        Flag(countryCode: "DO")!,
        Flag(countryCode: "DZ")!,
        Flag(countryCode: "EC")!,
        Flag(countryCode: "EE")!,
        Flag(countryCode: "EG")!,
        Flag(countryCode: "ER")!,
        Flag(countryCode: "ES")!,
        Flag(countryCode: "ET")!,
        Flag(countryCode: "FI")!,
        Flag(countryCode: "FJ")!,
        Flag(countryCode: "FK")!,
        Flag(countryCode: "FM")!,
        Flag(countryCode: "FO")!,
        Flag(countryCode: "GA")!,
        Flag(countryCode: "GB")!,
        Flag(countryCode: "GD")!,
        Flag(countryCode: "GE")!,
        Flag(countryCode: "GF")!,
        Flag(countryCode: "GG")!,
        Flag(countryCode: "GH")!,
        Flag(countryCode: "GI")!,
        Flag(countryCode: "GL")!,
        Flag(countryCode: "GM")!,
        Flag(countryCode: "GN")!,
        Flag(countryCode: "GP")!,
        Flag(countryCode: "GQ")!,
        Flag(countryCode: "GR")!,
        Flag(countryCode: "GS")!,
        Flag(countryCode: "GT")!,
        Flag(countryCode: "GU")!,
        Flag(countryCode: "GW")!,
        Flag(countryCode: "GY")!,
        Flag(countryCode: "HK")!,
        Flag(countryCode: "HM")!,
        Flag(countryCode: "HN")!,
        Flag(countryCode: "HR")!,
        Flag(countryCode: "HT")!,
        Flag(countryCode: "HU")!,
        Flag(countryCode: "ID")!,
        Flag(countryCode: "IE")!,
        Flag(countryCode: "IL")!,
        Flag(countryCode: "IM")!,
        Flag(countryCode: "IN")!,
        Flag(countryCode: "IO")!,
        Flag(countryCode: "IQ")!,
        Flag(countryCode: "IR")!,
        Flag(countryCode: "IS")!,
        Flag(countryCode: "IT")!,
        Flag(countryCode: "JE")!,
        Flag(countryCode: "JM")!,
        Flag(countryCode: "JO")!,
        Flag(countryCode: "JP")!,
        Flag(countryCode: "KE")!,
        Flag(countryCode: "KG")!,
        Flag(countryCode: "KH")!,
        Flag(countryCode: "KI")!,
        Flag(countryCode: "KM")!,
        Flag(countryCode: "KN")!,
        Flag(countryCode: "KP")!,
        Flag(countryCode: "KR")!,
        Flag(countryCode: "KW")!,
        Flag(countryCode: "KY")!,
        Flag(countryCode: "KZ")!,
        Flag(countryCode: "LA")!,
        Flag(countryCode: "LB")!,
        Flag(countryCode: "LC")!,
        Flag(countryCode: "LI")!,
        Flag(countryCode: "LK")!,
        Flag(countryCode: "LR")!,
        Flag(countryCode: "LS")!,
        Flag(countryCode: "LT")!,
        Flag(countryCode: "LU")!,
        Flag(countryCode: "LV")!,
        Flag(countryCode: "LY")!,
        Flag(countryCode: "MA")!,
        Flag(countryCode: "MC")!,
        Flag(countryCode: "MD")!,
        Flag(countryCode: "ME")!,
        Flag(countryCode: "MG")!,
        Flag(countryCode: "MH")!,
        Flag(countryCode: "MK")!,
        Flag(countryCode: "ML")!,
        Flag(countryCode: "MM")!,
        Flag(countryCode: "MN")!,
        Flag(countryCode: "MO")!,
        Flag(countryCode: "MP")!,
        Flag(countryCode: "MQ")!,
        Flag(countryCode: "MR")!,
        Flag(countryCode: "MS")!,
        Flag(countryCode: "MT")!,
        Flag(countryCode: "MU")!,
        Flag(countryCode: "MV")!,
        Flag(countryCode: "MW")!,
        Flag(countryCode: "MX")!,
        Flag(countryCode: "MY")!,
        Flag(countryCode: "MZ")!,
        Flag(countryCode: "NA")!,
        Flag(countryCode: "NC")!,
        Flag(countryCode: "NE")!,
        Flag(countryCode: "NF")!,
        Flag(countryCode: "NG")!,
        Flag(countryCode: "NI")!,
        Flag(countryCode: "NL")!,
        Flag(countryCode: "NO")!,
        Flag(countryCode: "NP")!,
        Flag(countryCode: "NR")!,
        Flag(countryCode: "NU")!,
        Flag(countryCode: "NZ")!,
        Flag(countryCode: "OM")!,
        Flag(countryCode: "PA")!,
        Flag(countryCode: "PE")!,
        Flag(countryCode: "PF")!,
        Flag(countryCode: "PG")!,
        Flag(countryCode: "PH")!,
        Flag(countryCode: "PK")!,
        Flag(countryCode: "PL")!,
        Flag(countryCode: "PM")!,
        Flag(countryCode: "PN")!,
        Flag(countryCode: "PR")!,
        Flag(countryCode: "PS")!,
        Flag(countryCode: "PT")!,
        Flag(countryCode: "PW")!,
        Flag(countryCode: "PY")!,
        Flag(countryCode: "QA")!,
        Flag(countryCode: "RE")!,
        Flag(countryCode: "RO")!,
        Flag(countryCode: "RS")!,
        Flag(countryCode: "RU")!,
        Flag(countryCode: "RW")!,
        Flag(countryCode: "SA")!,
        Flag(countryCode: "SB")!,
        Flag(countryCode: "SC")!,
        Flag(countryCode: "SD")!,
        Flag(countryCode: "SE")!,
        Flag(countryCode: "SG")!,
        Flag(countryCode: "SI")!,
        Flag(countryCode: "SJ")!,
        Flag(countryCode: "SK")!,
        Flag(countryCode: "SL")!,
        Flag(countryCode: "SM")!,
        Flag(countryCode: "SN")!,
        Flag(countryCode: "SO")!,
        Flag(countryCode: "SR")!,
        Flag(countryCode: "SS")!,
        Flag(countryCode: "ST")!,
        Flag(countryCode: "SV")!,
        Flag(countryCode: "SX")!,
        Flag(countryCode: "SY")!,
        Flag(countryCode: "SZ")!,
        Flag(countryCode: "TC")!,
        Flag(countryCode: "TD")!,
        Flag(countryCode: "TF")!,
        Flag(countryCode: "TG")!,
        Flag(countryCode: "TH")!,
        Flag(countryCode: "TJ")!,
        Flag(countryCode: "TK")!,
        Flag(countryCode: "TL")!,
        Flag(countryCode: "TM")!,
        Flag(countryCode: "TN")!,
        Flag(countryCode: "TO")!,
        Flag(countryCode: "TR")!,
        Flag(countryCode: "TT")!,
        Flag(countryCode: "TV")!,
        Flag(countryCode: "TW")!,
        Flag(countryCode: "TZ")!,
        Flag(countryCode: "UA")!,
        Flag(countryCode: "UG")!,
        Flag(countryCode: "UM")!,
        Flag(countryCode: "US")!,
        Flag(countryCode: "UY")!,
        Flag(countryCode: "UZ")!,
        Flag(countryCode: "VA")!,
        Flag(countryCode: "VC")!,
        Flag(countryCode: "VE")!,
        Flag(countryCode: "VG")!,
        Flag(countryCode: "VI")!,
        Flag(countryCode: "VN")!,
        Flag(countryCode: "VU")!,
        Flag(countryCode: "WF")!,
        Flag(countryCode: "WS")!,
        Flag(countryCode: "XK")!,
        Flag(countryCode: "YE")!,
        Flag(countryCode: "YT")!,
        Flag(countryCode: "ZA")!,
        Flag(countryCode: "ZM")!,
        Flag(countryCode: "ZW")!,
        Flag(countryCode: "EU")!,
        Flag(countryCode: "GB-ENG")!,
        Flag(countryCode: "GB-NIR")!,
        Flag(countryCode: "GB-SCT")!,
        Flag(countryCode: "GB-WLS")!,
        Flag(countryCode: "GB-ZET")!,
        Flag(countryCode: "LGBT")!,
        Flag(countryCode: "US-CA")!,
    ]
}
