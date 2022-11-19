import hashlib, time, curses, multiprocessing, psutil, os
from multiprocessing.pool import ThreadPool

class Block:
    def __init__(self, stdscr):
        self.stdscr = stdscr
        self.__info = []
        self.threads = -1
        self.times_int = 4
        self.times_string = ""
        self.mode = 0
        for i in range(self.times_int):
            self.times_string += "0"
        
    

    def get_much_threads(self):
        return self.threads

    def start(self, prev_hash):
        with ThreadPool(multiprocessing.cpu_count()) as p:
            p.map(self.miner, prev_hash)
            pp = psutil.Process(os.getpid())
            pp.nice(psutil.BELOW_NORMAL_PRIORITY_CLASS)
        

    def miner(self, prev_hash):
        self.__info.append({
            "hash": "",
            "tryis": 0,
            "start": time.time(),
            "stoped": False
        })
        self.threads += 1
        thread = self.threads
        
        if self.mode == 0 or self.lib == None:
            self.__info[thread]["hash"] = hashlib.sha256(
                hashlib.md5(
                    prev_hash.encode("utf-8")
                ).hexdigest().encode("utf-8")
            ).hexdigest()
            while self.__info[thread]["hash"][:self.times_int] != self.times_string:
                self.__info[thread]["hash"] = hashlib.sha256(
                    hashlib.md5(
                        self.__info[thread]["hash"].encode("utf-8")
                    ).hexdigest().encode("utf-8")
                ).hexdigest()
                self.__info[thread]["tryis"] += 1

        elif self.mode == 1:
            self.stdscr.addstr(10, 0, "lol")

            
            
        
        self.stdscr.addstr(3 + thread * 2, 0, " " + self.__info[thread]["hash"] + " ", curses.color_pair(5))
        self.__info[thread]["stoped"] = True
        self.__info[thread]["start"] = f'{(time.time() - self.__info[thread]["start"]):.{5}f}'

    def get_info(self):
        return self.__info

