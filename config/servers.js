const raid = {
    raid1: { descr: "RAID-1 (Mirror)", price: 0.0 },
    raid0: { descr: "RAID-0 (Stripe)", price: 0.0 },
    noraid: { descr: "No RAID", price: 0.0 }
}

const hdd = {
    "2x500sas": { descr: "2 x 500 GB 7.2k SAS", price: 40.0 },
    "2x1000sas": { descr: "2 x 1000 GB 7.2k SAS", price: 60.0 },
    "2x512ssd": { descr: "2 x 512 GB SSD", price: 100.0 }
}

const extra_hdd = {
    "500sas": { descr: "500 GB 7.2k SAS", price: 20.0 },
    "1000sas": { descr: "1000 GB 7.2k SAS", price: 30.0 },
    "512ssd": { descr: "512 GB SSD", price: 50.0 }
}

const extra_raid = {
    no_raid: { descr: "No RAID", disks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    raid0: { descr: "RAID 0 (stripe)", disks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    raid1: { descr: "RAID 1 (mirror)", disks: [2] },
    raid10: { descr: "RAID 1+0 (mirror+stripe)", disks: [4, 6, 8, 10, 12] },
    raid5: { descr: "RAID 5", disks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    raid6: { descr: "RAID 6", disks: [4, 5, 6, 7, 8, 9, 10, 11, 12] }
}

const ip = {
    "1": { descr: "/30 subnet (1 IP)", price: 0.0 },
    "5": { descr: "/29 subnet (5 IPs)", price: 10.0 },
    "13": { descr: "/28 subnet (13 IPs)", price: 25.0 },
    "29": { descr: "/27 subnet (29 IPs)", price: 60.0 },
    "61": { descr: "/26 subnet (61 IPs)", price: 150.0 },
    "125": { descr: "/25 subnet (125 IPs)", price: 350.0 },
    "253": { descr: "/24 subnet (253 IPs)", price: 500.0 }
}

const uplink = {
    "100m": { descr: "100 Mbps unmetered", price: 0.0 },
    "1g": { descr: "1 Gbps (100 TB included, overage $0.50c/1TB)", price: 50.0 },
    "1g_u": { descr: "1 Gbps unmetered", price: 100.0 },
    "10g": { descr: "10 Gbps (300 TB included, overage $0.50c/1TB)", price: 200.0 }
}

const os = {
    none: { descr: "None", price: 0.0 },
    centos: { descr: "CentOS", price: 0.0 },
    debian: { descr: "Debian", price: 0.0 },
    ubuntu: { descr: "Ubuntu", price: 0.0 },
    win2012std: { descr: "Windows Server 2012 Standard", price: 30.0 },
    win2012dtc: { descr: "Windows Server 2012 Datacenter", price: 90.0 },
    win2016std: { descr: "Windows Server 2016 Standard", price: 30.0 },
    win2016dtc: { descr: "Windows Server 2016 Datacenter", price: 90.0 }
}

const panel = {
    none: { descr: "None", price: 0.0 },
    cpanel: { descr: "cPanel", price: 35.0 },
    ispmanager: { descr: "ISPmanager", price: 35.0 }
}

const servers = {
    bl460c_g7: {
        descr: "HP ProLiant BL460c G7",
        img: "bl460c_g7.jpg",
        cpu: "2 x Intel Xeon X5650 2.50 GHz",
        facts: [
            "Hyper-Threading Technology",
            "Intel Virtualization Technology (VT-x)",
            "Intel VT-x for Directed I/O (VT-d)",
            "Intel VT-x with Extended Page Tables (EPT)",
            "KVM-over-IP (HP iLO 3)",
            "Up to 192GB of DDR3 memory",
            "Up to 8 x 10 GbE NIC's",
            "Intel&reg; 5500 Chipset",
            "HP&reg; Smart Array P410i Controller"
        ],
        price: 249.0,
        discounts: { month: 0, quarter: 10, semiannual: 20, annual: 30 },
        extra_hdds_price: 149.0,
        memory: { "48gb": { descr: "48 GB", price: 48.0 }, "96gb": { descr: "96 GB", price: 96.0 }, "192gb": { descr: "192 GB", price: 192.0 } },
        hdd: hdd,
        raid: raid,
        extra_raid: extra_raid,
        extra_hdd: extra_hdd,
        uplink: uplink,
        ip: ip,
        os: os,
        panel: panel
    },
    bl460c_gen8: {
        descr: "HP ProLiant BL460c Gen8",
        img: "bl460c_gen8.jpg",
        cpu: "2 x Intel Xeon Intel Xeon E5-2600",
        facts: ["Intel&reg; VT-x, VT-d, EPT", "KVM-over-IP (HP iLO 4)", "Up to 8 x 10 GbE NIC's", "Up to 512GB of RAM"],
        price: 399.0,
        discounts: { month: 0, quarter: 10, semiannual: 20, annual: 30 },
        extra_hdds_price: 149.0,
        memory: {
            "32gb": { descr: "32 GB", price: 32.0 },
            "64gb": { descr: "64 GB", price: 64.0 },
            "128gb": { descr: "128 GB", price: 128.0 },
            "256gb": { descr: "256 GB", price: 256.0 },
            "512gb": { descr: "512 GB", price: 512.0 }
        },
        hdd: hdd,
        raid: raid,
        extra_raid: extra_raid,
        extra_hdd: extra_hdd,
        uplink: uplink,
        ip: ip,
        os: os,
        panel: panel
    }
}

const defaultServerKey = "bl460c_g7"

const defaultConfigure = {
    server: defaultServerKey,
    ram: Object.keys(servers[defaultServerKey].memory)[0],
    hdd: Object.keys(servers[defaultServerKey].hdd)[0],
    raid: Object.keys(servers[defaultServerKey].raid)[0],
    uplink: Object.keys(servers[defaultServerKey].uplink)[0],
    ip: Object.keys(servers[defaultServerKey].ip)[0],
    os: Object.keys(servers[defaultServerKey].os)[0],
    panel: Object.keys(servers[defaultServerKey].panel)[0],
    extra_storage: false,
    extra_arrays: []
}

module.exports = { servers, defaultConfigure }
