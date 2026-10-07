# Networking Homework

## Task 1: Practice Resources

Here are the key networking reference repositories I went through from the DevOps Heroes list to brush up on core networking concepts:

- [Network Troubleshooting Guide](https://github.com/Nency-Ravaliya/Network-Troubleshooting) – Great reference for systematic debugging.
- [OSI Network Devices](https://github.com/Nency-Ravaliya/OSI-Network-devices) – Breakdown of switches, routers, gateways, and which OSI layers they operate on.
- [Networking Fundamentals](https://github.com/Nency-Ravaliya/Networking) – Overview of TCP/IP and core protocols.
- [Subnetting Practice](https://github.com/Nency-Ravaliya/Subnetting) – CIDR notations, subnet masks, and IP range calculations.
- [IP Quest](https://github.com/Nency-Ravaliya/IP-quest) – Deep dive into IP addressing and routing.
- [IPFIX, NetFlow & NTP](https://github.com/Nency-Ravaliya/IPFIX-NETFLOW-NTP) – Flow monitoring and clock synchronization protocols.
- [How DHCP Works](https://github.com/Nency-Ravaliya/How-DHCP-Works) – Step-by-step DORA (Discover, Offer, Request, Acknowledge) process.

---

## Task 2: Hands-On Command Practice

I ran these diagnostic commands locally on my Mac terminal, targeting `example.com` as a test host. Below are the actual terminal outputs and what I learned from each tool.

### 1. `ping`

**Why we use it:** Checks if a remote host is alive and measures the round-trip latency using ICMP echo requests.

```bash
$ ping -c 4 example.com
PING example.com (172.66.147.243): 56 data bytes
64 bytes from 172.66.147.243: icmp_seq=0 ttl=57 time=12.759 ms
64 bytes from 172.66.147.243: icmp_seq=1 ttl=57 time=14.639 ms
64 bytes from 172.66.147.243: icmp_seq=2 ttl=57 time=11.029 ms
64 bytes from 172.66.147.243: icmp_seq=3 ttl=57 time=10.808 ms

--- example.com ping statistics ---
4 packets transmitted, 4 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 10.808/12.309/14.639/1.543 ms
```

**Key Takeaway:** 
All 4 ICMP packets made it back with 0% packet loss and an average latency of ~12.3 ms, confirming a stable connection to the host.

---

### 2. `traceroute`

**Why we use it:** Maps out the network hops (routers) packets take to reach the destination.

```bash
$ traceroute -m 5 -w 1 example.com
traceroute to example.com (172.66.147.243), 5 hops max, 40 byte packets
 1  wifi.height8tech.com (100.129.160.1)  6.618 ms  5.274 ms  6.510 ms
 2  202.131.133.5.convergentindia.com (202.131.133.5)  5.561 ms  5.800 ms  5.420 ms
 3  115.117.125.189.static-mumbai.vsnl.net.in (115.117.125.189)  6.742 ms  8.014 ms  8.543 ms
 4  * * *
 5  * * *
```

**Key Takeaway:** 
The first 3 intermediate ISP hops responded quickly. The `* * *` on hops 4 and 5 don't mean the target is offline; intermediate firewalls and enterprise edge routers frequently drop or ignore TTL-exceeded UDP/ICMP probes for security.

---

### 3. `netstat`

**Why we use it:** Inspects active network sockets, routing tables, and interface statistics.

```bash
$ netstat -rn | head -12
Routing tables

Internet:
Destination        Gateway            Flags               Netif Expire
default            100.129.160.1      UGScg                 en0
100.129.160/20     link#11            UCS                   en0      !
100.129.160.1/32   link#11            UCS                   en0      !
100.129.160.1      f4:1e:57:3d:a6:d6  UHLWIir               en0   1161
100.129.160.29     6e:45:83:dc:3a:98  UHLWI                 en0   1077
100.129.160.47     ee:c8:bc:df:c5:b0  UHLWI                 en0     80
100.129.160.51     72:31:fe:8:8d:a7   UHLWI                 en0   1047
100.129.160.53     8e:37:ba:9:fe:fa   UHLWI                 en0    284
```

**Key Takeaway:** 
The `default` gateway entry points outgoing internet traffic to `100.129.160.1` via the primary Wi-Fi interface (`en0`). It also shows active ARP entries and local routing flags (`UGScg`).

---

### 4. `telnet`

**Why we use it:** Quickly tests raw TCP socket connectivity on a specific port without running a full browser or client.

```bash
$ telnet example.com 80
Trying 172.66.147.243...
Connected to example.com.
Escape character is '^]'.
Connection closed by foreign host.
```

**Key Takeaway:** 
The TCP handshake on port 80 succeeded immediately (`Connected to example.com`). The remote web server closed the connection right after because no HTTP request header was sent, which is the expected behavior.

---

### 5. `tcpdump`

**Why we use it:** Low-level packet capture tool for deep network inspection and payload debugging.

```bash
$ tcpdump -c 5 -i lo0 -nn
tcpdump: lo0: You don't have permission to capture on that device
((cannot open BPF device) /dev/bpf0: Permission denied)
```

**Key Takeaway:** 
Packet sniffing requires superuser privileges to access the Berkeley Packet Filter (`/dev/bpf0`). Running `sudo tcpdump -c 5 -i lo0 -nn` allows capturing traffic on the loopback device.

---

### 6. `nslookup`

**Why we use it:** Queries DNS servers to resolve hostnames to IP addresses.

```bash
$ nslookup example.com
Server:         100.129.160.1
Address:        100.129.160.1#53

Non-authoritative answer:
Name:   example.com
Address: 104.20.23.154
Name:   example.com
Address: 172.66.147.243
```

**Key Takeaway:** 
The local DNS server (`100.129.160.1:53`) returned two A-records (`104.20.23.154` and `172.66.147.243`). The response is marked as "Non-authoritative" since it came from the recursive cache rather than Cloudflare's authoritative nameserver directly.

---

### 7. `dig`

**Why we use it:** The go-to DNS diagnostic tool for detailed query flags, TTLs, record types, and nameserver responses.

```bash
$ dig example.com
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 6825
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 2, ADDITIONAL: 6

;; ANSWER SECTION:
example.com.            291     IN      A       172.66.147.243
example.com.            291     IN      A       104.20.23.154

;; AUTHORITY SECTION:
example.com.            26419   IN      NS      hera.ns.cloudflare.com.
example.com.            26419   IN      NS      elliott.ns.cloudflare.com.

;; Query time: 18 msec
;; SERVER: 100.129.160.1#53(100.129.160.1)
```

**Key Takeaway:** 
`dig` gives much richer output than `nslookup`: `status: NOERROR`, remaining TTL (291 seconds), authoritative nameservers (`hera.ns.cloudflare.com`), and exact query latency (18 ms).

---

### 8. `curl`

**Why we use it:** CLI tool for making HTTP/HTTPS requests, inspecting response headers, and testing web endpoints/APIs.

```bash
$ curl -I --max-time 10 https://example.com
HTTP/2 200
date: Thu, 03 Sep 2026 05:05:25 GMT
content-type: text/html
server: cloudflare
allow: GET, HEAD
accept-ranges: bytes
```

**Key Takeaway:** 
Fetching the headers (`-I`) confirmed the web server responded with `HTTP/2 200 OK`, served over Cloudflare with standard caching and content headers.

---

### 9. `arp`

**Why we use it:** Views the Address Resolution Protocol cache mapping Layer 3 IPv4 addresses to Layer 2 MAC addresses on the local network.

```bash
$ arp -an | head -12
? (100.129.160.1) at f4:1e:57:3d:a6:d6 on en0 ifscope [ethernet]
? (100.129.160.29) at 6e:45:83:dc:3a:98 on en0 ifscope [ethernet]
? (100.129.160.47) at ee:c8:bc:df:c5:b0 on en0 ifscope [ethernet]
? (100.129.160.51) at 72:31:fe:8:8d:a7 on en0 ifscope [ethernet]
? (100.129.160.53) at 8e:37:ba:9:fe:fa on en0 ifscope [ethernet]
? (100.129.160.54) at c6:b2:8b:d6:35:f5 on en0 ifscope [ethernet]
```

**Key Takeaway:** 
Shows all active hardware mappings on my local subnet. My default gateway `100.129.160.1` maps to MAC address `f4:1e:57:3d:a6:d6` via interface `en0`.

---

### 10. `systemctl` / `launchctl`

**Why we use it:** Manages background services, daemons, and system processes.

```bash
$ systemctl --version
PID     Status  Label
-       0       com.apple.SafariHistoryServiceAgent
-       -9      com.apple.progressd
-       0       com.apple.enhancedloggingd
14596   -9      com.apple.cloudphotod
-       -9      com.apple.MENotificationService
618     0       com.apple.Finder
64379   -9      com.apple.homed
65531   -9      com.apple.dataaccess.dataaccessd
-       0       com.apple.quicklook
-       0       com.apple.parentalcontrols.check
731     0       com.apple.mediaremoteagent
659     0       com.apple.FontWorker
63673   -9      com.apple.bird
-       0       com.apple.amp.mediasharingd
-       -9      com.apple.knowledgeconstructiond
64338   -9      com.apple.inputanalyticsd
-       0       com.apple.familycontrols.useragent
-       0       com.apple.AssetCache.agent
15854   0       com.apple.GameController.gamecontrolleragentd
-       0       com.apple.universalaccessAuthWarn
-       0       com.apple.UserPictureSyncAgent
```

**Key Takeaway:** 
`systemctl` is standard on Linux distributions for controlling `systemd` units (like `sudo systemctl status ssh`). On macOS, the underlying init manager is `launchd` (managed via `launchctl`).

---

## Summary

Practicing these 10 commands helped connect the dots across different networking layers:
- **Connectivity & Latency:** `ping` (ICMP)
- **Path & Routing:** `traceroute`, `netstat`
- **Port Availability & Handshake:** `telnet` (TCP)
- **Packet Inspection:** `tcpdump`
- **Name Resolution:** `nslookup`, `dig` (DNS)
- **Application Layer:** `curl` (HTTP/HTTPS)
- **Local Layer 2/3 Mapping:** `arp`
- **Service Status:** `systemctl` / `launchctl`
