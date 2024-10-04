from threading import Thread
from curses import wrapper
import curses, time
from block import Block


def main(stdscr):
    curses.init_pair(1, curses.COLOR_BLACK, curses.COLOR_BLACK)
    curses.init_pair(2, curses.COLOR_BLUE, curses.COLOR_BLACK)
    curses.init_pair(3, curses.COLOR_YELLOW, curses.COLOR_BLACK)
    curses.init_pair(4, curses.COLOR_GREEN, curses.COLOR_BLACK)
    curses.init_pair(5, curses.COLOR_BLACK, curses.COLOR_GREEN)
    stdscr.clear()

    block = Block(stdscr)

    stdscr.addstr(0, 0, "==================================================================\n")
    stdscr.addstr(1, 22, "Ukrainian", curses.color_pair(2))
    stdscr.addstr(1, 30, " ")
    stdscr.addstr(1, 31, "Crypto", curses.color_pair(3))
    stdscr.addstr(1, 38, "System", curses.color_pair(4))
    stdscr.addstr(2, 0, "==================================================================\n")

    Thread(target=block.start, args=(["000000ab1c004f9f04d7557c32c7d5043d8353cd7c830a01a1deb7b89fbab024", "00000086208fa415e22f7c2b4071fd28fa1bbd0cf4e2db8b11f98cbaec92dc7e"], )).start()
    
    menu(stdscr, block) 


def menu(stdscr, block):
    while True:
        threads = block.get_much_threads()
        info = block.get_info()
        stdscr.refresh()
        for i in range(threads + 1):
            time_timer = f"{(time.time() - info[(threads - i)]['start']):.{5}f}" if info[(threads - i)]['stoped'] == False else info[(threads - i)]['start']
            if info[(threads - i)]['stoped'] == False: 
                stdscr.addstr(3 + (threads - i) * 2, 0, " " + info[(threads - i)]["hash"] + " ", curses.color_pair(4))
            stdscr.addstr(4 + (threads - i) * 2, 0, f"  {time_timer}s.  Спроб: { info[(threads - i)]['tryis']}", 
                          curses.color_pair(4))
        
        stdscr.addstr(5 + (threads * 2), 0, "==================================================================\n")
        time.sleep(0)




wrapper(main)
